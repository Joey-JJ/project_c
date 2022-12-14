import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
// import { ChargeStation } from "./ChargeStation";
import type { ChargeStationType } from "../Types/ChargeStationType";
import { useSessionContext } from "../context/sessionContext";
import { ChargingSessionType } from "../Types/ChargingSessionType";
import { ChargeStation } from "./ChargeStation";
import { sendNotification } from "../utils/sendNotifications";



// Charging params
const MINIMUM_CHARGING_TIME = 3600; // 1 hour
const MAXIMUM_CHARGING_TIME = 21600; // 6 hours

export const ChargeStations: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const { session } = useSessionContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [chargingStations, setChargingStations] = useState<ChargeStationType[]>(
    []
  );

  const [isOccupied, setIsOccupied] = useState<boolean>(false);
  const [isMarked, setIsMarked] = useState<boolean>(false);
  
  
  const [isCurrentlyCharging, setIsCurrentlyCharging] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchChargeStations = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("charging_stations")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          setError(true);
          throw error;
        }
        if (data) {
          setChargingStations(data as ChargeStationType[]);
        }
          
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchActiveSessions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("charging_sessions")
          .select("*")
          .is("ended_at", null)
          .order("id", { ascending: true });

        if (error) {
          setError(true);
          throw error;
        }

        if (data && !isAdmin) {
          setIsCurrentlyCharging(
            (data as ChargingSessionType[]).some((chargingSession) => {
              if (chargingSession.taken_by === session?.user.id) {
                return true;
              }
            })
          );
        }
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSessions();
    fetchChargeStations();

    supabase
      .channel("public:charging_stations")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload: any) => {
        fetchActiveSessions();
        fetchChargeStations();
      })
      .subscribe();
  }, [session?.user.id, isAdmin]);

  useEffect(() => {
    fetchIsMarked()
    console.log(isMarked)
    const count = chargingStations.filter((station) =>  station.currently_occupied).length;      
    if (count === 6) {
      setIsOccupied(true);
    }
    if (isOccupied && count < 6 && isMarked) {
      sendNotification("A charging station is now free!", "Charge your car now!");
      setIsOccupied(false);
    }
  }, [chargingStations]);

  const stopChargingHandler = async () => {
    setLoading(true);
    try {
      // Update chargeStation in db
      const { error } = await supabase
        .from("charging_stations")
        .update([
          {
            currently_occupied: false,
            current_user_id: null,
          },
        ])
        .eq("current_user_id", session?.user.id);

      if (error) throw error;

      // Update chargeStation in state
      setChargingStations((prev) => {
        return prev.map((station) => {
          if (station.current_user_id === session?.user.id) {
            return {
              ...station,
              currently_occupied: false,
              current_user_id: null,
            };
          }
          return station;
        });
      });

      // Update chargingSession in db
      const endDate = new Date();
      // fetch started_at from db
      const { data, error: error2 } = await supabase
        .from("charging_sessions")
        .select("started_at")
        .eq("taken_by", session?.user.id)
        .is("ended_at", null)
        .single();

      const startDate = new Date(data?.started_at as string);
      const chargingTimeInSeconds =
        (endDate.getTime() - startDate.getTime()) / 1000;

      const awardTicket =
        chargingTimeInSeconds > MINIMUM_CHARGING_TIME &&
        chargingTimeInSeconds < MAXIMUM_CHARGING_TIME;

      if (awardTicket) {
        try {
          const { error } = await supabase.from("tickets").insert({
            user_id: session?.user.id,
            created_at: new Date().toISOString(),
          });

          if (error) throw error;

          alert("Congratulations! You have been awarded a ticket!");
        } catch (error: any) {
          alert(error.message);
        }
      } else {
        alert(
          "You have not been awarded a ticket because you did not stop your charging session soon enough or you have not charged long enough."
        );
      }

      if (error2) throw error2;

      const { error: error3 } = await supabase
        .from("charging_sessions")
        .update([
          {
            ended_at: endDate,
          },
        ])
        .eq("taken_by", session?.user.id)
        .is("ended_at", null);

      if (error3) throw error3;

      setIsCurrentlyCharging(false);
    } catch (error: any) {
      setError(true);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startCharging = async (station: ChargeStationType) => {
    try {
      const { error } = await supabase.from("charging_sessions").insert([
        {
          charger_id: station.id,
          started_at: new Date().toISOString(),
          taken_by: session?.user.id,
        },
      ]);

      if (error) throw error;

      const { error: error2 } = await supabase
        .from("charging_stations")
        .update([
          {
            currently_occupied: true,
            current_user_id: session?.user.id,
          },
        ])
        .eq("id", station.id);

      if (error2) throw error2;

      setChargingStations((prev) => {
        return prev.map((station) => {
          if (station.current_user_id === session?.user.id) {
            return {
              ...station,
              currently_occupied: true,
              current_user_id: session?.user.id,
            };
          }
          return station;
        });
      });
      if (!isAdmin) setIsCurrentlyCharging(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchIsMarked = async () => {
    try {

      const { data, error } = await supabase
        .from("profiles")
        .select("Notifications")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;


      if (data?.Notifications) {
        setIsMarked(true);
      }

    } catch (error: any) {
      alert(error.message);
    }
  };



  

  if (loading) return <div>Loading...</div>;
  if (error && !loading) return <div>Error, could not fetch data</div>;
  if (!loading && isCurrentlyCharging)
    return (
      <div>
        <h3>You are currently charging.</h3>
        <button className="btn btn-warning" onClick={stopChargingHandler}>
          Stop charging
        </button>
      </div>
    );

  return (
      <div className="grid sm:grid-cols-2 gap-2">
        {chargingStations.map((station) => (
          <ChargeStation
            key={Math.random()}
            station={station}
            chargingStations={chargingStations}
            setChargingStations={setChargingStations}
            startCharging={startCharging}
            isAdmin={isAdmin}
          />
        ))}
      </div>
     
  );
};

export default ChargeStations;

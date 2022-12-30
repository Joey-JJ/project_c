import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ChargeStation from "./ChargeStation";
import type { ChargeStationType } from "../Types/ChargeStationType";
import { useSessionContext } from "../context/sessionContext";

const ChargeStations: React.FC = () => {
  const { session } = useSessionContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentlyCharging, setCurrentlyCharging] = useState<boolean>(false);
  const [chargingStations, setChargingStations] = useState<ChargeStationType[]>(
    []
  );

  const stopChargingHandler = async () => {
    try {
      //update charging session
      const { error } = await supabase
        .from("charging_sessions")
        .update({ ended_at: new Date().toISOString() })
        .eq("taken_by", session?.user.id)
        .order("started_at", { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      //update charging station
      const { error: error2 } = await supabase
        .from("charging_stations")
        .update({ is_taken: false, taken_by: null })
        .eq("taken_by", session?.user.id);

      if (error2) {
        throw error2;
      }

      setCurrentlyCharging(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchChargeStations = async () => {
      try {
        const { data, error } = await supabase
          .from("charging_stations")
          .select("*");

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

    fetchChargeStations();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!chargingStations && error && !loading)
    return (
      <div>
        Could not fetch charging data, check your internet connection or try
        again later.
      </div>
    );

  return (
    <>
      {!currentlyCharging && (
        <h1>
          You are currently not charging, start a session by choosing a free
          charger.
        </h1>
      )}
      {currentlyCharging && (
        <div className="border-2 flex flex-col gap-4 p-4 items-center justify-center">
          <h1>
            You are currently charging, please stop the session when you are
            done.
          </h1>
          <button
            onClick={stopChargingHandler}
            className="btn btn-warning max-w-xs"
          >
            Stop charging
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {chargingStations
          .sort((a, b) => a.id - b.id)
          .map((station: ChargeStationType) => (
            <ChargeStation
              key={station.id}
              station={station}
              setCurrentlyCharging={setCurrentlyCharging}
            />
          ))}
      </div>
    </>
  );
};

export default ChargeStations;

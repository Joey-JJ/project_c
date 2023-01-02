import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { ChargeStation } from "./ChargeStation";
import type { ChargeStationType } from "../Types/ChargeStationType";
import { useSessionContext } from "../context/sessionContext";
import { ChargingSessionType } from "../Types/ChargingSessionType";

export const ChargeStations: React.FC = () => {
  const { session } = useSessionContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [chargingStations, setChargingStations] = useState<ChargeStationType[]>(
    []
  );
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

        if (data) {
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
  }, [session?.user.id]);

  if (loading) return <div>Loading...</div>;
  if (error && !loading) return <div>Erorr, could not fetch data</div>;
  if (!loading && isCurrentlyCharging)
    return (
      <div>
        <h3>You are currently charging.</h3>
        <button
          className="btn btn-warning"
          onClick={() => setIsCurrentlyCharging(false)}
        >
          Stop charging
        </button>
      </div>
    );

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {chargingStations.map((station) => (
        <ChargeStation
          key={station.id}
          station={station}
          chargingStations={chargingStations}
          setChargingStations={setChargingStations}
          setIsCurrentlyCharging={setIsCurrentlyCharging}
        />
      ))}
    </div>
  );
};

export default ChargeStations;

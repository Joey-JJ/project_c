import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ChargeStation from "./ChargeStation";
import type { ChargeStationType } from "../Types/ChargeStationType";

const ChargeStations: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentlyCharging, setCurrentlyCharging] = useState<boolean>(false);
  const [chargingStations, setChargingStations] = useState<ChargeStationType[]>(
    []
  );

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
      <h1>
        You are currently not charging, start a session by choosing a free
        charger.
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {chargingStations
          .sort((a, b) => a.id - b.id)
          .map((station: ChargeStationType) => (
            <ChargeStation
              key={station.id}
              station={station}
              currentlyCharging={currentlyCharging}
            />
          ))}
      </div>
    </>
  );
};

export default ChargeStations;

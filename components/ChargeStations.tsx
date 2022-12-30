import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ChargeStation from "./ChargeStation";
import type { ChargeStationType } from "../Types/ChargeStationType";

const ChargeStations: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
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
          throw error;
        }

        if (data) {
          console.log(data);
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

  if (!chargingStations)
    return (
      <div>
        Could not fetch charging data, check your internet connection or try
        again later.
      </div>
    );

  return (
    <div>
      {chargingStations.map((station: ChargeStationType) => (
        <ChargeStation key={station.id} station={station} />
      ))}
    </div>
  );
};

export default ChargeStations;

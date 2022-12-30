import React, { useState } from "react";
import type { ChargeStationType } from "../Types/ChargeStationType";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";

const ChargeStation: React.FC<{
  station: ChargeStationType;
  setCurrentlyCharging: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ station, setCurrentlyCharging }) => {
  const { session } = useSessionContext();
  const [taken, setTaken] = useState<boolean>(station.is_taken);

  const startChargingHandler = async () => {
    try {
      const { error } = await supabase.from("charging_sessions").insert([
        {
          started_at: new Date().toISOString(),
          taken_by: session?.user.id,
          charger_id: station.id,
        },
      ]);

      if (error) {
        throw error;
      }

      const { error: error2 } = await supabase
        .from("charging_stations")
        .update({ is_taken: true, taken_by: session?.user.id })
        .eq("id", station.id);

      if (error2) {
        throw error2;
      }

      setTaken(true);
      setCurrentlyCharging(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div
      className={`p-4 border-2 ${
        taken && "border-error bg-red-200"
      } flex flex-col gap-2 justify-between items-center`}
    >
      <h1>
        {!station.is_supercharger ? "Charger" : "Supercharger"} - {station.id}
      </h1>
      <button
        onClick={startChargingHandler}
        className={`${!taken ? "btn-primary" : "btn-error"} btn-xs`}
        disabled={taken}
      >
        {taken ? "Taken" : "Start charging"}
      </button>
    </div>
  );
};

export default ChargeStation;

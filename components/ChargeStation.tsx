import React from "react";
import type { ChargeStationType } from "../Types/ChargeStationType";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";

const ChargeStation: React.FC<{
  station: ChargeStationType;
  currentlyCharging: boolean;
}> = ({ station, currentlyCharging }) => {
  const { session } = useSessionContext();

  const startChargingHandler = async () => {
    const { error } = await supabase.from("charging_sessions").insert([
      {
        started_at: new Date().toISOString(),
        taken_by: session?.user.id,
        charger_id: station.id,
      },
    ]);

    if (error) {
      alert(error.message);
    }

    const { error: error2 } = await supabase
      .from("charging_stations")
      .update({ is_taken: true })
      .eq("id", station.id);

    if (error2) {
      alert(error2.message);
    }
  };

  return (
    <div className="p-4 border-2 flex flex-col gap-2 justify-between items-center">
      <h1>
        {!station.is_supercharger ? "Charger" : "Supercharger"} - {station.id}
      </h1>
      <button
        onClick={startChargingHandler}
        className="btn-primary btn-xs"
        disabled={station.is_taken}
      >
        Start charging
      </button>
    </div>
  );
};

export default ChargeStation;

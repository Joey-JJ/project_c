import React from "react";
import type { ChargeStationType } from "../Types/ChargeStationType";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";

const ChargeStation: React.FC<{ station: ChargeStationType }> = ({
  station,
}) => {
  const { session } = useSessionContext();

  const startChargingHandler = async () => {
    const { error } = await supabase.from("charging_sessions").insert([
      {
        started_at: new Date().toISOString(),
        taken_by: session?.user.id,
        charger_id: station.id,
      },
    ]);
  };

  return (
    <div className="p-4 border-2 flex flex-col gap-2 justify-between items-center">
      <h1>
        {!station.is_supercharger ? "Charger" : "Supercharger"} - {station.id}
      </h1>
      <button onClick={startChargingHandler} className="btn-primary btn-xs">
        Start charging
      </button>
    </div>
  );
};

export default ChargeStation;

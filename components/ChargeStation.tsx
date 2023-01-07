import React, { useState, useEffect } from "react";
import { ChargeStationType } from "../Types/ChargeStationType";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";
import { stat } from "fs";

type Props = {
  station: ChargeStationType;
  chargingStations: ChargeStationType[];
  startCharging: (station: ChargeStationType) => void;
};

export const ChargeStation: React.FC<Props> = ({
  station,
  chargingStations,
  startCharging,
}) => {
  const { session } = useSessionContext();
  const [isOccupied, setIsOccupied] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (chargingStations.length > 0) {
      const a = chargingStations.find(
        (s) => s.id === station.id
      )?.currently_occupied;
      setIsOccupied(a);
    }
  }, [station.id, chargingStations]);

  return (
    <div
      key={station.id}
      className={`border-2 border-gray-600 p-4 shadow-lg flex flex-col gap-2 justify-center items-center rounded-sm ${
        isOccupied && "bg-red-300"
      }`}
    >
      <h1>
        {!chargingStations.find((s) => s.id === station.id)?.is_supercharger
          ? "Charger"
          : "Supercharger"}
      </h1>
      <button
        className={`btn-xs ${isOccupied ? "btn-error" : "btn-primary"}`}
        onClick={() => startCharging(station)}
        disabled={isOccupied}
      >
        {isOccupied ? "Taken" : "Start Charging"}
      </button>
    </div>
  );
};

import React from "react";
import { ChargeStationType } from "../Types/ChargeStationType";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";

type Props = {
  station: ChargeStationType;
  chargingStations: ChargeStationType[];
  setChargingStations: React.Dispatch<
    React.SetStateAction<ChargeStationType[]>
  >;
  setIsCurrentlyCharging: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChargeStation: React.FC<Props> = ({
  station,
  chargingStations,
  setChargingStations,
  setIsCurrentlyCharging,
}) => {
  const { session } = useSessionContext();
  const startCharging = async () => {
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
          },
        ])
        .eq("id", station.id);

      if (error2) throw error2;

      setChargingStations((prev) => {
        return prev.map((s) => {
          if (s.id === station.id) {
            return { ...s, currently_occupied: true };
          }
          return s;
        });
      });
      setIsCurrentlyCharging(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div
      className={`border-2 border-gray-600 p-4 shadow-lg flex flex-col gap-2 justify-center items-center rounded-sm ${
        chargingStations.find((s) => s.id === station.id)?.currently_occupied &&
        "bg-red-300"
      }`}
    >
      <h1>
        {!chargingStations.find((s) => s.id === station.id)?.is_supercharger
          ? "Charger"
          : "Supercharger"}
      </h1>
      <button
        className={`btn-xs ${
          chargingStations.find((s) => s.id === station.id)?.currently_occupied
            ? "btn-error"
            : "btn-primary"
        }`}
        onClick={startCharging}
        disabled={
          chargingStations.find((s) => s.id === station.id)?.currently_occupied
        }
      >
        {chargingStations.find((s) => s.id === station.id)?.currently_occupied
          ? "Taken"
          : "Start Charging"}
      </button>
    </div>
  );
};

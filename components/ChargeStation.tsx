import React, { useState, useEffect } from "react";
import { ChargeStationType } from "../Types/ChargeStationType";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";
import { stat } from "fs";

type Props = {
  station: ChargeStationType;
  chargingStations: ChargeStationType[];
  startCharging: (station: ChargeStationType) => void;
  setChargingStations: React.Dispatch<
    React.SetStateAction<ChargeStationType[]>
  >;
  isAdmin: boolean;
};

export const ChargeStation: React.FC<Props> = ({
  station,
  chargingStations,
  startCharging,
  setChargingStations,
  isAdmin,
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

  const adminChargingSessionHandler = async () => {
    if (!isOccupied) {
      startCharging(station);
      return;
    }

    // Update charging session in db
    try {
      const { error } = await supabase
        .from("charging_sessions")
        .update({ ended_at: new Date() })
        .is("ended_at", null)
        .eq("charger_id", station.id);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    }

    // Update charging station in db
    try {
      const { error } = await supabase
        .from("charging_stations")
        .update({ currently_occupied: false, current_user_id: null })
        .eq("id", station.id);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    }

    // Update charging station in state
    setChargingStations((prev) => {
      return prev.map((s) => {
        if (s.id === station.id) {
          return {
            ...station,
            currently_occupied: false,
            current_user_id: null,
          };
        }
        return station;
      });
    });
  };

  return (
    <div
      key={station.id}
      className={`border-2 border-gray-600 p-4 shadow-lg flex flex-col gap-2 justify-center items-center rounded-sm ${
        isOccupied && "bg-red-300"
      }`}
    >
      <h1>
        #{station.id} -
        {!chargingStations.find((s) => s.id === station.id)?.is_supercharger
          ? "Charger"
          : "Supercharger"}
      </h1>
      {!isAdmin && (
        <button
          className={`btn-xs ${isOccupied ? "btn-error" : "btn-primary"}`}
          onClick={() => startCharging(station)}
          disabled={isOccupied}
        >
          {isOccupied ? "Taken" : "Start Charging"}
        </button>
      )}
      {isAdmin && (
        <button
          className={`btn-xs ${isOccupied ? "btn-error" : "btn-primary"}`}
          onClick={adminChargingSessionHandler}
        >
          {isOccupied ? "Stop session" : "Start session"}
        </button>
      )}
    </div>
  );
};

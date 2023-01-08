import React, { FC, useState, useEffect } from "react";
import { BsBell, BsBellSlash } from "react-icons/bs";
import { useSessionContext } from "../context/sessionContext";
import { supabase } from "../utils/supabaseClient";
import { ChargeStationType } from "../Types/ChargeStationType";





export const NotificationComponent: React.FC  = () => {
  const [marked, setMarked] = useState<boolean>(true);
  const [ chargingStations, setChargingStations ] = useState<ChargeStationType[]>([])
  const { session } = useSessionContext();
  const amountOfStations = chargingStations.length;
  const amountOfAvailableStations = chargingStations.filter(
    (station) => station.currently_occupied === false
  ).length;

  ssadr




  // fetcht de status en weergeeft het op een correcte manier op het scherm
  useEffect(() => {
    const fetchBell = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("Notifications")
        .eq("id", session?.user.id)
        .single();
      if (data) {
        setMarked(data.Notifications);
      }
    };
    fetchBell();

    supabase
      .channel("public:charging_stations")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload: any) => {
        fetchChargeStations();
      })
      .subscribe();
  }, [session?.user.id]);

  // updateBell wordt aangeroepen bij de druk op de knop
  async function updateBell() {
    const { data } = await supabase
      .from("profiles")
      .update({ Notifications: !marked })
      .eq("Notifications", marked)
      .eq("id", session?.user.id);
  }

  //send notification
  function sendNotification(title: string, body: string) {
    const options = {
      body,
    };
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
    };
  }

  // fetching the charging stations
  const fetchChargeStations = async () => {
    try {
      const { data, error } = await supabase
        .from("charging_stations")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }
      if (data) {
        setChargingStations(data as ChargeStationType[]);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };


    



    return (
      <div className="max-w-[15rem] flex flex-col justify-center items-center gap-2 stats shadow py-2">
        <div
          className="max-w-max"
          onClick={() => {
            updateBell();
            setMarked(!marked);
          }}
        >
          {
            marked ? (
              <BsBell size={50} />
            ) : (
              <BsBellSlash size={50} />
            ) /*  veranderd de bel in realtime */
          }
        </div>
        <p className="text-xs text-center">
          Click the bell to be notified when a charging spot becomes available
        </p>
      </div>
    );
};

export default NotificationComponent;

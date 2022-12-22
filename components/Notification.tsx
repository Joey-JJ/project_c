import React, { FC, useState, useEffect } from "react";
import { BsBell, BsBellSlash } from "react-icons/bs";
import { useSessionContext } from "../context/sessionContext";
import { supabase } from "../utils/supabaseClient";

const Notification: FC = () => {
  const [marked, setMarked] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const { session } = useSessionContext();
  // fetcht de status en weergeeft het op een correcte manier op het scherm
  useEffect(() => {
    const fetchBell = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('Notifications')
        .eq("id", session?.user.id)
        .single();
      if (data) {
        setMarked(data.Notifications)
      }
    }
  fetchBell();
  }, []);
  // updateBell wordt aangeroepen bij de druk op de knop
  async function updateBell () {
    const { data } = await supabase
      .from('profiles')
      .update({Notifications: !marked})
      .eq('Notifications', marked)
      .eq("id", session?.user.id)
      
  }
  return (
    <div className="max-w-[15rem] flex flex-col justify-center items-center gap-2 stats shadow py-2">
      <div className="max-w-max" onClick={() => { updateBell(); setMarked(!marked);}}> 
        {marked ? <BsBell size={50} /> : <BsBellSlash size={50} /> /*  veranderd de bel in realtime */}
      </div>
      <p className="text-xs text-center">
        Click the bell to be notified when a charging spot becomes available
      </p>
    </div>
  );
};

export default React.memo(Notification);

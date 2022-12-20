import React, { FC, useState, useEffect } from "react";
import { BsBell, BsBellSlash } from "react-icons/bs";
import { useSessionContext } from "../context/sessionContext";
import { supabase } from "../utils/supabaseClient";

const Notification: FC = () => {
  const [marked, setMarked] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const { session } = useSessionContext();
  /*const fetchBell = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('Notifications')
      .eq("id", session?.user.id);
    if (data) {
      alert(data)
      setMarked(!marked)
    }
}*/
  
  useEffect(() => {
    const fetchBell = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('Notifications')
        .eq("id", session?.user.id)
        .single();
      if (data) {
        console.log(data)
        //setMarked(data as any)
        setMarked(false);
        data ? setMarked(true) : setMarked(false);
      }
    }
  fetchBell();
  }, []);

  useEffect(() => {
// fetch bool and flip and return to db
  }, [marked])

  


  
  
  
  
  
  


  return (
    <div className="max-w-[15rem] flex flex-col justify-center items-center gap-2 stats shadow py-2">
      <div className="max-w-max" onClick={() =>  setMarked(prev => !prev)}>
        {marked ? <BsBell size={50} /> : <BsBellSlash size={50} />}
      </div>
      <p className="text-xs text-center">
        Click the bell to be notified when a charging spot becomes available
      </p>
    </div>
  );
};

export default React.memo(Notification);

import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { sessionContext } from "../context/sessionContext";
import { useContext } from "react";


interface Props {
  ticketCount: number;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
}

const TicketCount: React.FC<Props>= ({ticketCount, setTicketCount}) => {
  
  const [loading, setLoading] = useState(true);
  const { session }: any = useContext(sessionContext);
  const [status, setStatus] = useState("");



  useEffect(() => {

    try {
    // fetch tickets table
    const fetchTickets = async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", session?.user.id);
      if (error) {
        console.log(error);
      }

      if (data) {
        setTicketCount(data.length);
        setLoading(false);
          if (ticketCount === 0) {
            setStatus("You have no tickets");
          }
          else if (ticketCount >= 1 && ticketCount < 10) {
            setStatus("OK");
          }
          else if (ticketCount >= 10) {
            setStatus("Good job!");
          }
        }
      }

    fetchTickets();
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }, [])


  if(loading) {
    return <p>Loading...</p>
  }




  return (
    <div className="stats shadow">
      <div className="">
        <div className="stat">
          <div className="stat-title">Available Tickets</div>
          <div className="stat-value">{ticketCount}</div>
          <div className="stat-desc">{status}</div>
        </div>
      </div>
    </div>
  );
};
export default TicketCount;

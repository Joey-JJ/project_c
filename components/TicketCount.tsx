import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";
import { useContext } from "react";

interface Props {
  ticketCount: number;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
}

const TicketCount: React.FC<Props> = ({ ticketCount, setTicketCount }) => {
  const { session } = useSessionContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const fetchTickets = async () => {
        const { data, error } = await supabase
          .from("tickets")
          .select("*")
          .eq("user_id", session?.user.id);

        if (error) {
          setError(true);
          throw error;
        }

        setTicketCount(data.length);
      };

      fetchTickets();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, [session?.user.id, setTicketCount]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="stats shadow">
      <div className="">
        <div className="stat items-center text-center">
          <div className="stat-title">Available Tickets</div>
          <div className="stat-value">{ticketCount}</div>
          <div className="stat-desc">
            {ticketCount === 0 && "You have no tickets"}
            {ticketCount > 0 && ticketCount < 10 && "Keep it up!"}
            {ticketCount > 10 && "Amazing! "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketCount;

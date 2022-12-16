// Description: LotterySystem for admin component
// Adds a Ticket to the total tickets table in the database if user presses the button
//

import React from "react";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useSessionContext } from "../context/sessionContext";
import { TicketAdmin } from "../Types/TicketsAdmin";
import { createID } from "../utils/createID";
import { randomUUID } from "crypto";

interface Props {
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
}

const LotterySystemAdmin: React.FC<Props> = ({ setTicketCount }) => {
  const [loading, setLoading] = useState(true);
  const { session } = useSessionContext();
  const addTicket = async () => {
    const ticket: TicketAdmin = {
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("totaltickets")
      .insert([ticket])
      .single();
    if (error) console.log(error);
    if (!error) {
      console.log(data);
      const fetchTickets = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("totaltickets")
          .select("*")
          //.eq("user_id", session?.user.id);
        if (error) {
          console.log(error);
        }

        if (data) {
          console.log(data);
          setTicketCount(data.length);
          setLoading(false);
        }
      };
      fetchTickets();
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={addTicket}>
        Add Ticket (to the total tickets)
      </button>
    </div>
  );
};

export default LotterySystemAdmin;

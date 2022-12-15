// Description: LotterySystem component
// Adds a Ticket to the Tickets table in the database if user presses the button
//

import React from "react";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useSessionContext } from "../context/sessionContext";
import { Profile } from "../Types/Profiles";
import { Ticket } from "../Types/Tickets";
import { createID } from "../utils/createID";
import { randomUUID } from "crypto";

interface Props {
  profile: Profile;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
}

const LotterySystem: React.FC<Props> = ({ profile, setTicketCount }) => {
  const [loading, setLoading] = useState(true);
  const { session } = useSessionContext();

  const addTicket = async () => {
    const ticket: Ticket = {
      user_id: profile.id,
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("tickets")
      .insert([ticket])
      .single();
    if (error) console.log(error);
    if (!error) {
      console.log(data);
      const fetchTickets = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("tickets")
          .select("*")
          .eq("user_id", session?.user.id);
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
        Add Ticket
      </button>
    </div>
  );
};

export default LotterySystem;

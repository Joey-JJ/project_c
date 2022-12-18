import React from "react";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import { Profile } from "../Types/Profiles";
import { Ticket } from "../Types/Tickets";

export default function AdminRaffle() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [winner, setWinner] = useState<Profile>();
  const [user_id, setUserId] = useState("");

  useEffect(() => {
    try {
      // fetch tickets table from supabase and set tickets state to the data
      // has to be done in useEffect because of async does not rerender when database changes!
      const fetchTickets = async () => {
        const { data, error } = await supabase.from("tickets").select("*");
        if (error) {
          console.log(error);
        }

        if (data) {
          data.map((ticket) => {
            setTickets((tickets) => [...tickets, ticket]);
          });
        }
      };

      fetchTickets();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const fetchWinner = async (winner: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", winner)
      .maybeSingle();
    if (error) {
      console.log(error);
    }
    if (data) {
      setWinner(data);
      console.log(data);
    }
  };

  const chooseWinner = () => {
    const randomTicket = tickets[Math.floor(Math.random() * tickets.length)];
    if (!randomTicket) return;
    const winner = randomTicket.user_id;
    fetchWinner(winner);
  };

  function CreateTicket(user_id: string): Ticket {
    const newTicket: Ticket = {
      user_id: user_id,
      created_at: new Date().toISOString(),
    };
    return newTicket;
  }

  const addTicket = async (user_id: string) => {
    const ticket = CreateTicket(user_id);
    const { data, error } = await supabase.from("tickets").insert(ticket);
    if (error) {
      console.log(error);
    }
    if (data) {
      setTickets((tickets) => [...tickets, ticket]);
      console.log(data);
    }
  };

  return (
    <div>
      <div className="container mx-auto min-h-screen flex flex-col items-center">
        <div className="card w-96 shadow-xl border-2">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Raffle!</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={chooseWinner}>
                <label htmlFor="my-modal">Choose Winner</label>
              </button>
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    Congratulations {winner?.full_name}!
                  </h3>
                  <p className="py-4">
                    The winner of the raffle is {winner?.full_name}!
                  </p>
                  <p className="py-4">email address: {winner?.email}</p>
                  <div className="modal-action">
                    <label htmlFor="my-modal" className="btn">
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card w-96 shadow-xl border-2">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Add Ticket</h2>
            <div className="card-actions justify-end">
              <input type="text"  onChange={(e) => setUserId(e.target.value)} />
              <button
                className="btn btn-primary"
                onClick={() => addTicket(user_id)}
              >
                Add Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import { Profile } from "../Types/Profiles";
import { Ticket } from "../Types/Tickets";
import Alert from "../components/UI/Alert";
import { useSessionContext } from "../context/sessionContext";

export default function AdminRaffle() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [winner, setWinner] = useState<Profile>();
  const [user_id, setUserId] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");

  const { session } = useSessionContext();

  useEffect(() => {
    try {
      // fetch tickets table from supabase and set tickets state to the data
      // has to be done in useEffect because of async does not rerender when database changes!
      const fetchTickets = async () => {
        const { data, error } = await supabase.from("tickets").select("*");
        if (error) {
          console.log(error);
          setAlert(true);
          setAlertMessage(error.message);
          setAlertTitle("Error");
          setAlertType("error");
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

  //fetching tickets from database and setting tickets state to the data with no duplicates in array
  const fetchTickets = async () => {
    const { data, error } = await supabase.from("tickets").select("*");
    if (error) {
      console.log(error);
      setAlert(true);
      setAlertMessage(error.message);
      setAlertTitle("Error");
      setAlertType("error");
    } else {
      setTickets(data);
    }
  };

  const flushData = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .delete()
      .eq("isTicket", true);
    if (error) {
      console.log(error);
      setAlert(true);
      setAlertMessage(error.message);
      setAlertTitle("Error");
      setAlertType("error");
    } else {
      console.log("Raffle has been flushed");
      setAlert(true);
      setAlertMessage("Raffle has been flushed");
      setAlertTitle("Warning");
      setAlertType("warning");
      fetchTickets();
    }
  };

  const fetchWinner = async (winner: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", winner)
      .maybeSingle();
    if (error) {
      console.log(error);
      setAlert(true);
      setAlertMessage(error.message);
      setAlertTitle("Error");
      setAlertType("error");
    } else {
      setWinner(data);
      flushData();
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
      setAlert(true);
      setAlertMessage(error.message);
      setAlertTitle("Error");
      setAlertType("error");
    } else {
      console.log(data);
      setAlert(true);
      setAlertMessage("Ticket has been added");
      setAlertTitle("Success");
      setAlertType("success");
      fetchTickets();
    }
  };

  //Adding alert to show if ticket was added or not
  if (!session) return <div>no access</div>;
  return (
    <div>
      {alert && (
        <Alert
          title={alertTitle}
          message={alertMessage}
          type={alertType}
          onClick={() => setAlert(false)}
        />
      )}

      <div className="container mx-auto min-h-screen flex flex-col items-center space-y-10 mt-5">
        <div className="card w-96 shadow-xl border-2">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Raffle!</h2>
            <p className="py-4">
              Warning: This will delete all tickets in the database! There are
              currently {tickets.length} tickets in the raffle!
            </p>
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
            <div className="card-actions justify-start">
              <input
                type="text"
                className="input input-bordered"
                placeholder="User ID"
                value={user_id}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end">
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

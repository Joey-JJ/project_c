import React from "react";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useSessionContext } from "../context/sessionContext";

var numberoftickets = 0;
var emails = "";

interface Props {
    ticketCount: number;
    setTicketCount: React.Dispatch<React.SetStateAction<number>>;
  }

const TicketCountAdmin: React.FC<Props> = ({ ticketCount, setTicketCount }) => {
    
    const [raffledtickets, setRaffledtickets] = useState("");
    const [loading, setLoading] = useState(true);
    const { session } = useSessionContext();
    const [status, setStatus] = useState("");
    const handleSubmit = (event: any) => {
        event.preventDefault();
        {parseInt(raffledtickets) > 0 && parseInt(raffledtickets) < 6 ? numberoftickets = numberoftickets + parseInt(raffledtickets) : alert(`Please enter a proper number`)}
        {parseInt(raffledtickets) > 0 && parseInt(raffledtickets) < 6 ? alert(`You just raffled! Click on see results to see the results of this raffle.`): emails = emails}
        for (let i = 0; i < parseInt(raffledtickets); i++){
            emails = emails + "testemail@email.com "}
        
        
    }

    useEffect(() => {
        try {
          // fetch totaltickets table
          const fetchTickets = async () => {
            const { data, error } = await supabase
              .from("totaltickets")
              .select("*")
            if (error) {
              console.log(error);
            }
    
            if (data) {
              setTicketCount(data.length);
              setLoading(false);
              if (ticketCount === 0) {
                setStatus("You have no tickets");
              } else if (ticketCount >= 1 && ticketCount < 10) {
                setStatus("OK");
              } else if (ticketCount >= 10) {
                setStatus("Good job!");
              }
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
    
    return(
        <div className="stats w-70 bg-base-100 card-bordered shadow-xl overflow-visible p-2 md:p-1 lg:p-0">
            <div className="">
            
            <div className="stat p-2 md:p-2 lg:p-8">
                <div className="stat-title text-center lg:text-left">Total tickets raffled off</div>
                <div className="stat-value text-center lg:text-left">{ticketCount}</div>
                <div>{status}</div>
                &nbsp;
                <div className="flex flex-col space-y-0.5 hover:space justify-center items-center">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Input amount of tickets to raffle off..." value={raffledtickets} onChange={(e) => setRaffledtickets(e.target.value)} className="input input-bordered w-full max-w-xs text-center lg:text-left mb-2" />
                    <div>
                        
                        <input type="submit" value="Raffle Tickets" className="btn btn-wide w-25 min-[360px]:w-40 items-center"  
                        />
                        <label htmlFor="my-modal-4" className="btn btn-wide w-25 min-[360px]:w-40 items-center">
                            See results
                        </label>
                        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        <label htmlFor="my-modal-4" className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                <h3 className="text-lg font-bold text-left">The winners of this raffle</h3>
                            <div className="whitespace-pre-line">
                                {emails}
                            </div>
                            </label>
                        </label>
                    </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    );
};
export default TicketCountAdmin;

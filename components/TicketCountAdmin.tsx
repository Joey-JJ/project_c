import React from "react";

const TicketCountAdmin = () => {
    return(
        <div className="stats w-70 bg-base-100 card-bordered shadow-xl overflow-visible">
            <div className="">
            <div className="stat">
                <div className="stat-title text-center lg:text-left">Tickets remaining to give out</div>
                <div className="stat-value text-center lg:text-left">6</div>
                &nbsp;
                <input type="text" placeholder="Input email here..." className="input input-bordered w-full max-w-xs text-center lg:text-left" />
                &nbsp;
                <div className="flex flex-col space-y-0.5 hover:space">
                <button className="btn btn-primary">Give out ticket</button>
                
                <button className="btn btn-primary">Award ticket to random user</button>
                </div>
            </div>
            </div>
        </div>
    );
};
export default TicketCountAdmin;
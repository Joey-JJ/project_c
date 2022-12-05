import React from "react";

const TicketCountAdmin = () => {
    return(
        <div className="stats shadow">
            <div className="">
            <div className="stat">
                <div className="stat-title">Tickets remaining to give out</div>
                <div className="stat-value">6</div>
                &nbsp;
                <input type="text" placeholder="Input email here..." className="input input-bordered w-full max-w-xs" />
                &nbsp;
                <button className="btn btn-primary">Give out ticket</button>
            </div>
            </div>
        </div>
    );
};
export default TicketCountAdmin;
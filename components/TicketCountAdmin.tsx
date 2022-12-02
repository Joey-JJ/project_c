import React from "react";

const TicketCountAdmin = () => {
    return(
        <div className="stats w-70 bg-base-100 card-bordered shadow-xl overflow-visible p-2 md:p-1 lg:p-0">
            <div className="">
            <div className="stat p-2 md:p-2 lg:p-8">
                <div className="stat-title text-center lg:text-left">Total tickets raffled off</div>
                <div className="stat-value text-center lg:text-left">14</div>
                &nbsp;
                <input type="text" placeholder="Input amount of tickets to raffle off..." className="input input-bordered w-full max-w-xs text-center lg:text-left mb-2" />
                <div className="flex flex-col space-y-0.5 hover:space justify-center items-center">
                <label htmlFor="my-modal-4" className="btn btn-wide lg:w-80">
                Raffle tickets
                </label>
                </div>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-left">The winners of this raffle</h3>
                    <div className="whitespace-pre-line">
                            kaassoufle@email.com, salade@email.com, kaassouflesalademetsausenei@email.com, k@email.com and meertesting@email.com!
                    </div>
                </label>
                </label>
            </div>
            </div>
        </div>
    );
};
export default TicketCountAdmin;
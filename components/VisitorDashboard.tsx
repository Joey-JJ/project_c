import { useState } from "react";
import type { NextPage } from "next";
import TicketCount from "./TicketCount";
import Notification from "./Notification";
import LuutChargeStations from "./LuutChargeStations";
import LotterySystem from "./LotterySystem";
import { Profile } from "../Types/Profiles";
import { useSessionContext } from "../context/sessionContext";
import ChargeStations from "./ChargeStations";
import Emails from "./Emails";

interface Props {
  profile: Profile;
}

const VisitorDashboard: React.FC<Props> = ({ profile }) => {
  const [ticketCount, setTicketCount] = useState(0);
  const { session } = useSessionContext();
  const Profile = profile;

  return (
    <div className="">
      <div className="container mx-auto min-h-[calc(100vh-70px)] flex flex-col items-center gap-10  ">
        <p>Logged in as: {session?.user.email}</p>
        <label htmlFor="my-modal-4" className="btn btn-primary">
          Instructions
        </label>

        <LotterySystem profile={Profile} setTicketCount={setTicketCount} />

        <ChargeStations />

        <div className="flex">
          <Notification />
          <TicketCount
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
          />
        </div>
      </div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">How it works</h3>
          <p className="pt-2">
            <span className="text-green-500">Green</span>: The charging station
            is empty and is ready to be used
          </p>
          <p className="py-0">
            <span className="text-orange-500">Orange</span>: The charging
            station is occupied but isn&apos;t charging
          </p>
          <p className="py-0">
            <span className="text-red-600">Red</span>: The charging station is
            occupied and is charging
          </p>
          <p className="py-2">
            You get tickets by good behaviour, removing your car when it&apos;s
            done charging for example. The tickets can be used for a prize, try
            collect a lot!
          </p>
          <p className="py-0"></p>
        </label>
      </label>
    </div>
  );
};

export default VisitorDashboard;

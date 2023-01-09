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

        <ChargeStations isAdmin={false} />

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
          <h3 className="text-lg font-bold mb-2">How it works</h3>
          <p>
            To start a charging session, press the button on the charging
            station of the station you are currently parked on. You can earn
            tickets by charging your car and ending the session within 6 hours.
            When you end the session, you will have to move your car from the
            charging spot. Every once in a while, the admin will grab a random
            ticket from the database and the owner of that ticket will win a
            prize. All tickets get deleted when a raffle happens.
          </p>
        </label>
      </label>
    </div>
  );
};

export default VisitorDashboard;

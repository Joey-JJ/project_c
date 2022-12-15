import { useState } from "react";
import type { NextPage } from "next";
import TicketCount from "./TicketCount";
import Notification from "./Notification";
import LuutChargeStations from "./LuutChargeStations";
import LotterySystem from "./LotterySystem";
import { Profile } from "../Types/Profiles";
import { useSessionContext } from "../context/sessionContext";

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
        <LuutChargeStations />
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
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            consectetur quae dolores provident modi nobis ex quia illum
            dignissimos, dicta accusantium deleniti minus soluta voluptas
            maiores nesciunt aspernatur architecto obcaecati!
          </p>
        </label>
      </label>
    </div>
  );
};

export default VisitorDashboard;

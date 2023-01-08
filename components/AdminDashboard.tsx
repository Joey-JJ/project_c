import React, { FC, useEffect, useState } from "react";
import Chart from "../components/Chart";
import TicketCountAdmin from "../components/TicketCountAdmin";
import { Profile } from "../Types/Profiles";
import { useSessionContext } from "../context/sessionContext";
import LotterySystemAdmin from "./LotterySystemAdmin";
import TicketCount from "./TicketCount";
import ChargeStations from "./ChargeStations";
import Emails from "./Emails";

const AdminDashboard: React.FC = () => {
  //making a admin dashboard
  const [ticketCount, setTicketCount] = useState(0);

  return (
    <div>
      <div className="container mx-auto min-h-screen flex flex-col items-center overflow-visible mt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChargeStations isAdmin={true} />
          <TicketCountAdmin
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
          ></TicketCountAdmin>
          <LotterySystemAdmin setTicketCount={setTicketCount} />
          <Emails />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

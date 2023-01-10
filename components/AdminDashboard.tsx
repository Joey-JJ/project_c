import React, { FC, useEffect, useState } from "react";
import Chart from "../components/Chart";
import ChargeStations from "./ChargeStations";
import Emails from "./Emails";

const AdminDashboard: React.FC = () => {
  //making a admin dashboard
  const [ticketCount, setTicketCount] = useState(0);

  return (
    <div>
      <div className="container mx-auto min-h-screen flex flex-col items-center overflow-visible mt-4 mb-4">
        <ChargeStations isAdmin={true} />
        <Emails />
      </div>
    </div>
  );
};

export default AdminDashboard;

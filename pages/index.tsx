import { useContext } from "react";
import type { NextPage } from "next";

import Image from "next/image";
import TicketCount from "../components/TicketCount";
import TicketCountAdmin from "../components/TicketCountAdmin";
import { supabase } from "../utils/supabaseClient";
import Notification from "../components/Notification";
import { sessionContext } from "../context/sessionContext";
import VisitorDashboard from "../components/VisitorDashboard";
import AdminDashboard from "../components/AdminDashboard";


const Home: NextPage = () => {
  const { session }: any = useContext(sessionContext);
  const isAdmin = session.user.email.ToLower() === "caverobeheerder@gmail.com" ? true : false;


  return (
    <div className="">
      <div className="container mx-auto min-h-[calc(100vh-70px)] flex flex-col items-center gap-10  ">
        <p>Logged in as: {session.user.email}</p>

        <TicketCount></TicketCount>
        <TicketCountAdmin></TicketCountAdmin> 

        <label htmlFor="my-modal-4" className="btn btn-primary">
          Instructions
        </label>
        <LuutChargeStations />

  return (
  (isAdmin ? <AdminDashboard /> : <VisitorDashboard />)
  );
};

export default Home;

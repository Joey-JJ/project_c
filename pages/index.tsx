import { useContext } from "react";
import type { NextPage } from "next";


import { sessionContext } from "../context/sessionContext";
import VisitorDashboard from "../components/VisitorDashboard";
import AdminDashboard from "../components/AdminDashboard";


const Home: NextPage = () => {
  const { session }: any = useContext(sessionContext);
  const isAdmin = session.user.email.toLowerCase() === "caverobeheerder@gmail.com" ? true : false;

  return (
  (isAdmin ? <AdminDashboard /> : <VisitorDashboard />)
  );
};

export default Home;

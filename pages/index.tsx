import { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import VisitorDashboard from "../components/VisitorDashboard";
import AdminDashboard from "../components/AdminDashboard";
import Register from "../components/Register";

interface Props {
  session: any;
}

const Home: NextPage<Props> = ({ session }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const isAdmin: boolean =
    session.user.email.toLowerCase() === "caverobeheerder@gmail.com"
      ? true
      : false;

  useEffect(() => {
    const checkForProfileData = async () => {
      setLoading(true);
      try {
        // const { data, error } = await supabase
        //   .from("profiles")
        //   .select("*")
        //   .eq("id", ((session as any).user as any).id)
        //   .single();
        // const { data, error } = await supabase
        //   .from("profiles")
        //   .select("*")
        //   .eq("id", session.user.id)
        //   .single();
        // if (!data) {
        //   console.log("no data");
        //   return;
        // }
        // if (error) throw error;
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      checkForProfileData();
    }
  }, [session]);
  console.log("session", session);

  // if (loading) return <p>Loading...</p>;
  // if (showRegister) return <Register session={session} />;

  return isAdmin ? (
    <AdminDashboard session={session} />
  ) : (
    <VisitorDashboard session={session} />
  );
};

export default Home;

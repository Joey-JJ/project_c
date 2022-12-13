import { useContext } from "react";
import type { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import Register from "./Register";
import { useEffect } from "react";
import { useState } from "react";

import { useSessionContext } from "../context/sessionContext";
import VisitorDashboard from "../components/VisitorDashboard";
import AdminDashboard from "../components/AdminDashboard";
import SignIn from "../components/SignIn";

const Home: NextPage = () => {
  const { session } = useSessionContext();
  const isAdmin =
    session?.user.email?.toLowerCase() === "caverobeheerder@gmail.com"
      ? true
      : false;
  const [fetchError, setFetchError] = useState("");
  const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   const fetchProfile = async () => {

  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", session?.user.id)
  //       .maybeSingle();

  //     if (error) {
  //       setFetchError("Could not fetch profile");
  //       console.log(error);
  //       setProfile(null);
  //       }	;
  //     if (data) {
  //       setProfile(data);
  //       setFetchError("");
  //     }
  //     if (!data) {
  //       setProfile(null);
  //       setFetchError("");
  //       }
  //   }
  //   fetchProfile();
  // }, []);

  if (!session) {
    <SignIn />;
  }

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {session && isAdmin && <AdminDashboard />}
      {session && !isAdmin && <VisitorDashboard />}
      {/* {!profile && <Register />} */}
    </div>
  );
};

export default Home;

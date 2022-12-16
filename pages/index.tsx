import type { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import Register from "./Register";
import { useEffect } from "react";
import { useState } from "react";

import { useSessionContext } from "../context/sessionContext";
import VisitorDashboard from "../components/VisitorDashboard";
import AdminDashboard from "../components/AdminDashboard";

import { Profile } from "../Types/Profiles";
import SignIn from "../components/SignIn";

const Home: NextPage = () => {
  const { session } = useSessionContext();
  const isAdmin =
    session?.user.email?.toLowerCase() === "caverobeheerder@gmail.com"
      ? true
      : false;
  const [fetchError, setFetchError] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user.id) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .maybeSingle();

      if (error) {
        setFetchError("Could not fetch profile");
        console.log(error);
      }
      if (data) {
        setProfile(data);
        setFetchError("");
      }
    };
    fetchProfile();
  }, [session?.user.id]);

  if (!session) {
    return <SignIn />;
  }

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {profile && isAdmin && <AdminDashboard />}
      {/* // session back to profile when fixing register form */}
      {profile && !isAdmin && <VisitorDashboard profile={profile} />}
      {!profile && <Register />}
    </div>
  );
};

export default Home;

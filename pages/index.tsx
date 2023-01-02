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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hasProfileData, setHasProfileData] = useState<boolean>(false);

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
        if (
          (data as Profile).full_name &&
          (data as Profile).license_number &&
          (data as Profile).charge_card
        ) {
          setHasProfileData(true);
        }
        setFetchError("");
      }
    };
    fetchProfile();
  }, [session?.user.id]);

  if (!session) {
    return <SignIn />;
  }

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {hasProfileData && !isAdmin && (
        <VisitorDashboard profile={profile as Profile} />
      )}
      {hasProfileData && isAdmin && (
        <AdminDashboard profile={profile as Profile} />
      )}
      
      {!hasProfileData && <Register setHasProfileData={setHasProfileData} />}
    </>
  );
};

export default Home;

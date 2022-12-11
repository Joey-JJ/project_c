import { useContext } from "react";
import type { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import Register from "./Register";
import { useEffect } from "react";
import { useState } from "react";


import { sessionContext } from "../context/sessionContext";
import VisitorDashboard from "../components/VisitorDashboard";
import AdminDashboard from "../components/AdminDashboard";


const Home: NextPage = () => {
  const { session }: any = useContext(sessionContext);
  const isAdmin = session.user.email.toLowerCase() === "caverobeheerder@gmail.com" ? true : false;
  const [fetchError, setFetchError] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
  
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
        
      if (error) { 
        setFetchError("Could not fetch profile");
        console.log(error);
        setProfile(null);
        }	;
      if (data) {
        setProfile(data);
        setFetchError("");
      }
      if (!data) {
        setProfile(null);
        setFetchError("");
        }
    }
    fetchProfile();
  }, []);




 
  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {profile && isAdmin && <AdminDashboard />}
      {profile && !isAdmin && <VisitorDashboard />}
      {!profile && <Register />}
    </div>

  );
};

export default Home;

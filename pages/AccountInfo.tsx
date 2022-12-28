import TicketCount from "../components/TicketCount";
import { useSessionContext } from "../context/sessionContext";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";
import { useContext } from "react";
import { Profile } from "../Types/Profiles";

const AccountInfo = () => {
  const { session } = useSessionContext();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [firtsLetter, setfirtsLetter] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();
      if (error) {
        console.log("error: " + error);
      }

      if (data) {
        console.log(data);
        setProfile(data);
        setLoading(false);
      }

      if ( profile?.full_name !== null  && profile?.full_name !== undefined ) {
        setfirtsLetter(Array.from(profile.full_name)[0]);
      }
    };
    fetchProfile();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto min-h-screen flex flex-col mt-8 items-center">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-20 mb-8">
            <span className="text-3xl">{firtsLetter}</span>
          </div>
        </div>
        <div className="stats shadow stats-vertical">
          <div className="stat">
            <div className="stat-title">Name</div>
            <div className="stat-value text-sm">{profile?.full_name}</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Email</div>
            <div className="stat-value text-sm">{session?.user.email}</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Card number</div>
            <div className="stat-value text-sm">{profile?.charge_card}</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">License number</div>
            <div className="stat-value text-sm">{profile?.license_number}</div>
            <div className="stat-actions">
              <button className="btn btn-primary btn-sm btn-wide">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;

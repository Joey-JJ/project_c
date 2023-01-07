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
  const [newProfile, setNewProfile] = useState<Profile>({} as Profile);
  const [newEmail, setNewEmail] = useState<string>("");


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      if (!session?.user.id) return;
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

      if (profile?.full_name !== null && profile?.full_name !== undefined) {
        setfirtsLetter(Array.from(profile.full_name)[0]);
      }
    };
    fetchProfile();
  }, [session?.user.id]);

  if (loading) {
    return <div>Loading...</div>;
  };

  const fetchProfile = async () => {
    setLoading(true);
    if (!session?.user.id) return;
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

    if (newProfile?.full_name !== null && newProfile?.full_name !== undefined) {
      setfirtsLetter(Array.from(newProfile.full_name)[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "Email") {
      setNewEmail(e.target.value);
    } else {
      const { name, value } = e.target;
      setNewProfile({ ...newProfile, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEmail) {
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      if (error) {
        console.log("error: " + error);
        return;
      }

      if (data) {
        console.log(data);
      }
    } else {
      const { data, error } = await supabase
        .from("profiles")
        .update(newProfile)
        .eq("id", session?.user.id);
      if (error) {
        console.log("error: " + error);
        return;
      }
      fetchProfile();
    }
  };


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
            <form onSubmit={handleSubmit}>
              <div className="form-control m-3">
                <label className="input-group input-group-vertical">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    name="full_name"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="stat-actions">
                <button type="submit" className="btn btn-primary btn-sm btn-wide">Edit</button>
              </div>
            </form>
          </div>
          <div className="stat">
            <div className="stat-title">Email</div>
            <div className="stat-value text-sm">{session?.user.email}</div>
            <form onSubmit={handleSubmit}>
              <div className="form-control m-3">
                <label className="input-group input-group-vertical">
                  <span>Email</span>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered"
                    name="Email"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="stat-actions">
                <button type="submit" className="btn btn-primary btn-sm btn-wide">Edit</button>
              </div>
            </form>
          </div>
          <div className="stat">
            <div className="stat-title">Card number</div>
            <div className="stat-value text-sm">{profile?.charge_card}</div>
            <form onSubmit={handleSubmit}>
              <div className="form-control m-3">
                <label className="input-group input-group-vertical">
                  <span>Card number</span>
                  <input
                    type="text"
                    placeholder="Card number"
                    className="input input-bordered"
                    name="charge_card"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="stat-actions">
                <button type="submit" className="btn btn-primary btn-sm btn-wide">Edit</button>
              </div>
            </form>
          </div>
          <div className="stat">
            <div className="stat-title">License number</div>
            <div className="stat-value text-sm">{profile?.license_number}</div>
            <form onSubmit={handleSubmit}>
              <div className="form-control m-3">
                <label className="input-group input-group-vertical">
                  <span>License number</span>
                  <input
                    type="text"
                    placeholder="License number"
                    className="input input-bordered"
                    name="license_number"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="stat-actions">
                <button type="submit" className="btn-primary btn-sm btn-wide">Edit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;

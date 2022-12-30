import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";

interface Props {
  setHasProfileData: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = ({ setHasProfileData }) => {
  const [cardnumber, setCardnumber] = useState("");
  const [license, setLicense] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { session } = useSessionContext();

  //add authenticated user to database profile and adding cardnumber and license and name
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .update({
          full_name: name,
          license_number: license,
          charge_card: cardnumber,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session?.user.id);

      if (!error) {
        setHasProfileData(true);
      }
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">License number</span>
              </label>
              <input
                type="text"
                placeholder="XX-XXX-XX"
                className="input input-bordered w-full max-w-xs"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Card number</span>
              </label>
              <input
                type="text"
                placeholder="XX-XXX-XX-XXXXXX"
                className="input input-bordered w-full max-w-xs"
                value={cardnumber}
                onChange={(e) => setCardnumber(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                <span>{loading ? "Loading" : "Registered"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

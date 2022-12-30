import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSessionContext } from "../context/sessionContext";
import { validChargeNumber, validLicenseNumbers } from "../components/Regex";

const Register: React.FC = () => {
  const [cardnumber, setCardnumber] = useState("");
  const [license, setLicense] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { session } = useSessionContext();

  const validateInput = () => {
    // input validation nummerplaat
    const testLicenseNumber = (regexes: any, number:any ) => {
      if (number.length != 6){
        alert("Please enter a valid license number")
        return false
      }
      for (let i = 0; i < 18; i++){
        if (regexes[i].test(number)) {
          return true
        }
        else if(i == 18){
          alert("Please enter a valid license number")
          return false
        }
      }
    }
    // input validation oplaadpas
    const testCardNumber = (regex: any, number: any) => {
      if (regex.test(number) && number.length < 15) {
        return true
      }
      else{
        alert("Please enter a valid card number")
        return false
      }
    }
    if (testLicenseNumber(validLicenseNumbers, license.replace(/-/g, '').toUpperCase()) && testCardNumber(validChargeNumber, cardnumber.replace(/-/g, '').toUpperCase())){
      console.log(license, cardnumber)  
      return true
    }
    else{
      return false
    }
  }

  //add authenticated user to database profile and adding cardnumber and license and name
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateInput()){
      alert("Your details are valid!")
    }
    else{
      alert("details invalid")
      return
    }
    try {

      setLoading(true);
      const { error } = await supabase.from("profiles").insert([
        {
          id: session?.user.id,
          full_name: name,
          license_number: license,
          charge_card: cardnumber,
        },
      ]);
      if (error) throw error;
    } catch (error: any) {
      console.log(error);
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
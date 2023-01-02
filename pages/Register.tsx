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
  const checkDoubleHyphen = (code: any) => {
    let count = 0;
    for (let i = 0; i < code.length; i++){
      if (code.charAt(i) == "-"){
        count++
      }
    }
    if (count > 1){return true}
    else{return false}
  }
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
    if (checkDoubleHyphen(license) && checkDoubleHyphen(cardnumber)){
      if (testLicenseNumber(validLicenseNumbers, license.replace(/-/g, '').toUpperCase()) && testCardNumber(validChargeNumber, cardnumber.replace(/-/g, '').toUpperCase())){
        return true
      }
    }
    else{
      alert("Your card number or license number isn't correct, try again!")
      return false
    }
  }

  //add authenticated user to database profile and adding cardnumber and license and name
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateInput()){
      console.log("Details validated")
    }
    else{
      return
    }
    try {

      setLoading(true);
      const { error } = await supabase.from("profiles").insert([
        {
          id: session?.user.id,
          full_name: name,
          license_number: license.toUpperCase(),
          charge_card: cardnumber.toUpperCase(),
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
                placeholder="Eg: 1-CAV-01"
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
                placeholder="Eg: NL-CAV-123456-7"
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
                placeholder="Eg: Jan Peter Balkenende"
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                <span>{loading ? "Loading" : "Register"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
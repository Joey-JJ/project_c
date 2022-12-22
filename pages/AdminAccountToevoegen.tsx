import { validLicenseNumbers } from "../components/Regex";
import React, { useState } from "react";

const AdminAccountToevoegen = () => {
  const [inputs, setInputs] = useState({});
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({...values, [name]: value}))
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (validateInput()){
      alert("The form was submitted because all the inputs were correct!")
      console.log(inputs);
    }
    else{
      alert("The form was not submitted because not all inputs were correct!")
    }
    //alert(inputs);
  }

  // input validation
  const validateInput = () => {
    const testLicenseNumber = (regexes: any, number:any ) => {
      for (let i = 0; i < 18; i++){
        if (regexes[i].test(number)) {
          return true
        }
        else{
          return false
        }
      }
    }
    inputs.license_number = inputs.license_number.replace(/-/g, '').toUpperCase();
    if (testLicenseNumber(validLicenseNumbers, inputs.license_number)){
      return true
    }
    else{
      alert("Please enter a valid license number")
    }
  }

  return (
    <div >
      
      <div className="max-w-[400px] m-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="card-title text-center justify-center card w-70 lg:w-100 bg-[#B09E7E] card-bordered shadow-xl overflow-visible">
          Add

          Account
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add name"
            className="input input-bordered"
            name="username"
            value={inputs.username || ""} 
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            placeholder="Add email"
            className="input input-bordered"
            name="email"
            value={inputs.email || ""} 
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add cardnumber"
            className="input input-bordered"
            name="card_number"
            value={inputs.card_number || ""} 
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add license plate"
            className="input input-bordered"
            name="license_number"
            value={inputs.license_number || ""} 
            onChange={handleChange}
          />
        </div>
        <div className="form-control mt-2 items-center">
          <button type="submit" className="btn btn-wide">
            Add Account
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AdminAccountToevoegen;

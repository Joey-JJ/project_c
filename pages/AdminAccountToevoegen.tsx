import { validChargeNumber, validLicenseNumbers } from "../components/Regex";
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
  }

  // input validation van ome yourick
  const validateInput = () => {
    // input validation nummerplaat
    const testLicenseNumber = (regexes: any, number:any ) => {
      for (let i = 0; i < 18; i++){
        if (regexes[i].test(number)) {
          return true
        }
        else if (i == 18){
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
    if (testLicenseNumber(validLicenseNumbers, inputs.license_number.replace(/-/g, '').toUpperCase()) && testCardNumber(validChargeNumber, inputs.card_number.replace(/-/g, '').toUpperCase())){
      return true
    }
    else{
      return false
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
            placeholder="Add full name"
            className="input input-bordered"
            name="username"
            value=""
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            placeholder="Add email (example@email.com)"
            className="input input-bordered"
            name="email"
            value=""
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add cardnumber (NL-CAV-12..)"
            className="input input-bordered"
            name="card_number"
            value=""
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add license plate (1-CAV-01)"
            className="input input-bordered"
            name="license_number"
            value=""
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

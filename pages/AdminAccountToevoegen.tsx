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
    console.log(inputs);
    alert(inputs);
  }

  return (
    <div >
      
      <div className="max-w-[400px] m-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="card-title text-center justify-center card w-70 lg:w-100 bg-base-300 card-bordered shadow-xl overflow-visible">
          Add

          Account
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add name"
            className="input input-bordered"
            name="username"
            value=""
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            placeholder="Add email"
            className="input input-bordered"
            name="email"
            value=""
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add cardnumber"
            className="input input-bordered"
            name="card_number"
            value=""
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add license plate"
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

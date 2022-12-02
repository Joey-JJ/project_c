import React from "react";

const AddNewUser = () => {
  const handleSubmit = () => {};

  return (
    <div className="max-w-[400px] m-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="text-center">
          Account
          <br />
          toevoegen
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Vul volledige naam in"
            className="input input-bordered"
            name="name"
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Voer telefoon nummer in"
            className="input input-bordered"
            name="phone_number"
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            placeholder="Voer email-adres in"
            className="input input-bordered"
            name="email"
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Voer kaartnummer in"
            className="input input-bordered"
            name="card_number"
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Voer kenteken in"
            className="input input-bordered"
            name="license_number"
          />
        </div>
        <div className="form-control mt-2">
          <button type="submit" className="btn btn-primary">
            Voeg account toe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;

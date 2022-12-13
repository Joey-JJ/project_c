const AdminAccountToevoegen = () => {
  const handleSubmit = () => {};

  return (
    <div className="max-w-[400px] m-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="text-center">
          Add
          <br />
          Account
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add name"
            className="input input-bordered"
            name="name"
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            placeholder="Add email"
            className="input input-bordered"
            name="email"
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add cardnumber"
            className="input input-bordered"
            name="card_number"
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add license plate"
            className="input input-bordered"
            name="license_number"
          />
        </div>
        <div className="form-control mt-2">
          <button type="submit" className="btn btn-primary">
            Add Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAccountToevoegen;

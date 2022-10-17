import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl">Sign in via magic link with your email below</h1>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              placeholder="Type here..."
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              <span>{loading ? "Loading" : "Send magic link"}</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;

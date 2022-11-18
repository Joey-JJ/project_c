import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Register = () => {
    const [cardnumber, setPassword] = useState("");
    const [License, setLicense] = useState("");
    const [name, setName] = useState("");
    
    
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">License number</span>
                            </label>
                            <input type="text" placeholder="XX-XXX-XX" className="input input-bordered w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Card number</span>
                            </label>
                            <input type="text" placeholder="XX-XXX-XX-XXXXXX" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <button className="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register

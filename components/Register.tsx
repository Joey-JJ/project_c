
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { sessionContext } from "../context/sessionContext";
import { useContext } from "react";



const Register = () => {
    const [cardnumber, setCardnumber] = useState("");
    const [License, setLicense] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase.
                from("profiles")
                .insert([{ cardnumber: cardnumber, license: License, name: name }]);
            if (error) throw error;
        } catch (error: any) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
            setCardnumber("");
            setLicense("");
            setName("");
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
                                <input type="text"
                                    placeholder="XX-XXX-XX"
                                    className="input input-bordered w-full max-w-xs"
                                    value={License}
                                    onChange={(e) => setLicense(e.target.value)} />

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Card number</span>
                                </label>
                                <input type="text" placeholder="XX-XXX-XX-XXXXXX" className="input input-bordered w-full max-w-xs"
                                    value={cardnumber}
                                    onChange={(e) => setCardnumber(e.target.value)} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <button className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </>
        );

    
};

export default Register;

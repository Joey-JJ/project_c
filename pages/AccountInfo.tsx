

import React from "react";
import { supabase } from "../utils/supabaseClient";



const AccountInfo = () => {
    return (
        <div>
            <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">t</span>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">test</h2>
                <p className="mb-3">
                    <span className="badge me-2">test</span>
                    <span className="badge me-2">test</span>
                    <span className="badge me-2">test</span>
                </p>
            </div>
        </div>
    );
};

export default AccountInfo;
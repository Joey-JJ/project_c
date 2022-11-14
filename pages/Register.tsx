import React from 'react'

export default function Register() {
    return (
        <>
            <div class="flex flex-col justify-center items-center">
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

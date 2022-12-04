import React, { FC, useEffect, useState } from "react";
import {ID} from "../components/AdminInfo";





console.log(ID);
let color: string = "blue";
let idTest: number=ID;
const UserInfo_Admin: FC = () => {
  return (
    
    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">User 1</h2>
    <p>Name:{ID}</p> 
    <p>Email:***</p>
    <p>Cardnumber:***</p>
    <p>license plate:***</p>
  </div>
 

<label htmlFor="my-modal" className="btn">Edit info</label>
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Edit user information</h3>
    <p className="py-4">Name: <input type="text" placeholder="Type here" className="input w-full max-w-xs" /></p>
    <p className="py-4">Email: <input type="text" placeholder="Type here" className="input w-full max-w-xs" /></p>
    <p className="py-4">Cardnumber: <input type="text" placeholder="Type here" className="input w-full max-w-xs" /></p>
    <p className="py-4">license plate: <input type="text" placeholder="Type here" className="input w-full max-w-xs" /></p>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn">Save</label>
    </div>
  </div>
</div>
<button className="btn btn-active">Delete account</button>
</div>   
    
    
  
  );
};



export default UserInfo_Admin ;
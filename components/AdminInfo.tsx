import React, { FC, useEffect, useState } from "react";

import UserInfoAdmin from "../components/UserInfoAdmin";
import { AiFillSketchCircle } from "react-icons/ai";



let userID: number = 1;
let user1: number = 1;
let user2: number = 2;
function change() {
  return(
    userID=user2
  )
}
const adminInfo: FC = () => {
  return (
    
      
    <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
   
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
      <li><a><input type="text" placeholder="search" className="input w-full max-w-xs   "></input></a></li>
      <li><a><button className="btn btn-wide">user {user1}</button></a></li>
      <li><a><button onClick={change}  className="btn btn-wide">user {user2}</button></a></li>
    </ul>
  
  </div>
</div>
    
    
    
  
  );
};


export const ID = userID;
export default adminInfo ;
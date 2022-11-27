import React, { FC, useEffect, useState } from "react";








const adminInfo: FC = () => {
  return (
    
    <div tabIndex={0} className="collapse border border-base-300 bg-base-100 rounded-box"> 
    <div className="collapse-title text-xl font-medium">
      User ID:***
    </div>
    <div className="collapse-content"> 
      <p>name:***</p>
      <p>kenteken:***</p>
      <p>card:***</p>
      <p>
        <label htmlFor="my-modal" className="btn">edit info</label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit user info</h3>
                    <p className="py-4">name: <input type="text" placeholder="edit" className="input w-full max-w-xs" /></p>
                    <p className="py-4">kenteken: <input type="text" placeholder="edit" className="input w-full max-w-xs" /></p>
                    <p className="py-4">card: <input type="text" placeholder="edit" className="input w-full max-w-xs" /></p>
                        <div className="modal-action">
                            <label htmlFor="my-modal" className="btn">save</label>
                        </div>
            </div>
        </div></p>
    </div>
  </div>
  );
};



export default adminInfo ;

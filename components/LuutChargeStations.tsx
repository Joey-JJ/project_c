import React, { FC, useEffect, useState } from "react";



const ChargeStation: FC = () => {
  return (
    <div tabIndex={0} className="collapse border border-base-300 bg-base-100 rounded-box"> 
    <div className="collapse-title text-xl font-medium">
      user:*
    </div>
    <div className="collapse-content"> 
      <p>tabIndex={0}user info</p>
    </div>
  </div>
  );
};


const station_info = () => {
    
        for (let i = 0; i < 6; i++){
            return(
                <ChargeStation/>
            )
        }
    
  };
export default ChargeStation;
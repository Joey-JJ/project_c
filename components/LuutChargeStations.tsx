import React, { FC, useEffect, useState } from "react";

const STATUS_KEY = {
  BEING_USED: "being_used",
  ALMOST_OVER: "almost_over",
  FREE: "free",
};

const STATUS_COLOR = {
  [STATUS_KEY.BEING_USED]: "bg-red-600",
  [STATUS_KEY.ALMOST_OVER]: "bg-orange-500",
  [STATUS_KEY.FREE]: "bg-green-500",
};

interface ChargeType {
  name: string;
  status: string;
}

interface ChargeStationProps {
  name: string;
  status: string;
}

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

const LuutChargeStations: FC = () => {
  const [chargeStationData, setChargeStationData] = useState<ChargeType[]>([]);

  useEffect(() => {
    getFakeData();
    setInterval(getFakeData, 3000);
  }, []);

  const getFakeData = () => {
    const statusKeys = Object.values(STATUS_KEY);
    const updatedFakeData = [];
    for (let i = 0; i < 6; i++) {
      updatedFakeData.push({
        name: i < 4 ? `Laadpaal ${i + 1}` : `Fast charge ${i - 3}`,
        status: statusKeys[Math.floor(Math.random() * statusKeys.length)],
      });
    }
    setChargeStationData(updatedFakeData);
  };

  

  return (
    <div className=" max-w-screen-lg">
      
        {chargeStationData.map( () => (
          <ChargeStation
          />
        ))}
      </div>
    
  );
};

export default LuutChargeStations;
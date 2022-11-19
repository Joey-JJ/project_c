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

const ChargeStation: FC<ChargeStationProps> = ({ name, status }) => {
  return (
    <div className="sm:w-1/3 w-1/2 sm:px-6 px-2 sm:py-4 py-2">
      <div className="px-4 py-6 border-2 border-white max-w-[200px] mx-auto flex items-center justify-evenly">
        <div className="sm:text-lg text-sm font-bold text-white">{name}</div>
        <div
          className={`w-[24px] border-[1px] border-white h-[24px] rounded-full ${STATUS_COLOR[status]}`}
        ></div>
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

  if (!chargeStationData?.length) {
    return null;
  }

  return (
    <div className=" max-w-screen-lg">
      <div className="flex flex-wrap -sm:mx-3 mx-1 my-2">
        {chargeStationData.map((chargeStation, idx) => (
          <ChargeStation
            key={idx}
            name={chargeStation.name}
            status={chargeStation.status}
          />
        ))}
      </div>
    </div>
  );
};

export default LuutChargeStations;

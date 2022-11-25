import React, { FC, useEffect, useState } from "react";

//make 6 different charging stations with a status

const STATUS_KEY = {
    BEING_USED: "being_used",
    ALMOST_OVER: "almost_over",
    FREE: "free",
};

const STATUS_COLOR = {
  [STATUS_KEY.BEING_USED]: "error",
  [STATUS_KEY.ALMOST_OVER]: "warning",
  [STATUS_KEY.FREE]: "success",
};

interface ChargeType {
  name: string;
  status: string;
}

interface ChargeStationProps {
  name: string;
  status: string;
}

const badgeColor = (status: string) => {
    switch (status) {
        case STATUS_KEY.BEING_USED:
            return <div>
                <span className="badge-error">{status}</span>
            </div>
        case STATUS_KEY.ALMOST_OVER:
            return <div>
                <span className="badge-warning">{status}</span>
            </div>
        case STATUS_KEY.FREE:
            return <div>
                <span className="badge-success">{status}</span>
            </div>
        default:
            return <div>
                <span className="badge-success">{status}</span>
            </div>
    }
};

const ChargeStation: FC<ChargeStationProps> = ({ name, status }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
            {badgeColor(status)}
        </p>
        <div className="card-actions justify-end">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Click
            </label>
            <div
              tabIndex={0}
              className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content"
            >
              <div className="card-body">
                <h3 className="card-title">Stats!</h3>
                <p>Some stats about this item.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: FC = () => {
  //making a admin dashboard
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
    <div>
      <div className="container mx-auto min-h-screen flex flex-col">
        <div className="grid grid-cols-2 gap-4">
      {chargeStationData.map((chargeStation, idx) => (
          <ChargeStation
            key={idx}
            name={chargeStation.name}
            status={chargeStation.status}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;

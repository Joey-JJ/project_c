import React, { FC, useEffect, useState } from "react";
import Chart from "../components/Chart";
import TicketCountAdmin from "../components/TicketCountAdmin";
import { Profile } from "../Types/Profiles";
import { useSessionContext } from "../context/sessionContext";
import LotterySystemAdmin from "./LotterySystemAdmin";
import TicketCount from "./TicketCount";
import ChargeStations from "./ChargeStations";

//make 6 different charging stations with a status

interface Props {
  profile: Profile;
}

const STATUS_KEY = {
  BEING_USED: "Being_used",
  ALMOST_OVER: "Almost_over",
  FREE: "Free",
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

const USER = {
  NAME: "John Doe",
  L_NUMBER: "G-001-BB",
  EMAIL: "JohnDoe@test.nl",
};

const RemoveUnderScore = (name: string) => {
  return name.replace(/_/g, " ");
};

const isUsed = (status: string) => {
  switch (status) {
    case STATUS_KEY.BEING_USED:
      return (
        <div>
          <p>Current user: {USER.NAME}</p>
          <p>License plate number: {USER.L_NUMBER}</p>
          <p>Email: {USER.EMAIL}</p>
        </div>
      );
    case STATUS_KEY.ALMOST_OVER:
      return (
        <div>
          <p>Current user: {USER.NAME}</p>
          <p>License plate number: {USER.L_NUMBER}</p>
          <p>Email: {USER.EMAIL}</p>
        </div>
      );
    case STATUS_KEY.FREE:
      return (
        <div>
          <p>Current user: None</p>
          <p>License plate number: None</p>
          <p>Email: None</p>
        </div>
      );
    default:
      return (
        <div>
          <p>Current user: None</p>
          <p>License plate number: None</p>
          <p>Email: None</p>
        </div>
      );
  }
};

const badgeColor = (status: string) => {
  switch (status) {
    case STATUS_KEY.BEING_USED:
      return (
        <div>
          <span className="badge badge-error">{RemoveUnderScore(status)}</span>
        </div>
      );
    case STATUS_KEY.ALMOST_OVER:
      return (
        <div>
          <span className="badge badge-warning">
            {RemoveUnderScore(status)}
          </span>
        </div>
      );
    case STATUS_KEY.FREE:
      return (
        <div>
          <span className="badge badge-success">
            {RemoveUnderScore(status)}
          </span>
        </div>
      );
    default:
      return (
        <div>
          <span className="badge badge-success">
            {RemoveUnderScore(status)}
          </span>
        </div>
      );
  }
};

export const ChargeStation: FC<ChargeStationProps> = ({ name, status }) => {
  return (
    <div className="card w-70 lg:w-100 bg-base-100 card-bordered shadow-xl overflow-visible">
      <div className="card-body items-center lg:items-baseline">
        <h2 className="card-title">{name}</h2>
        <p>{badgeColor(status)}</p>
        <div className="card-actions">
          <div className="dropdown dropdown-hover overflow-visible">
            <label tabIndex={0} className="btn btn-wide lg:w-80">
              More
            </label>
            <div
              tabIndex={0}
              className="dropdown-content card card-bordered shadow-xl bg-base-100  text-black"
            >
              <div className="card-body p-0.5 md:p-2.5 lg:p-8">
                <h3 className="card-title">Info</h3>
                <h4>Usage: </h4>
                <p>{isUsed(status)}</p>
                <h4>Stats: </h4>
                <p>
                  <Chart />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  profile: Profile;
}

const AdminDashboard: React.FC<Props> = ({ profile }) => {
  //making a admin dashboard
  const [chargeStationData, setChargeStationData] = useState<ChargeType[]>([]);
  const [ticketCount, setTicketCount] = useState(0);
  const { session } = useSessionContext();
  const Profile = profile;

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
      <div className="container mx-auto min-h-screen flex flex-col items-center overflow-visible mt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChargeStations />
          <TicketCountAdmin
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
          ></TicketCountAdmin>
          <LotterySystemAdmin setTicketCount={setTicketCount} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

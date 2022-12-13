import { useContext } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import TicketCount from "./TicketCount";
import Notification from "./Notification";
import { sessionContext } from "../context/sessionContext";
import LuutChargeStations from "./LuutChargeStations";

interface Props {
    profile: any;
}

const VisitorDashboard : React.FC<Props> = ({profile}) => {
    
    const { session }: any = useContext(sessionContext);

    return ( 
        <div className="">
        <div className="container mx-auto min-h-[calc(100vh-70px)] flex flex-col items-center gap-10  ">
          <p>Logged in as: {session.user.email}</p>
          <label htmlFor="my-modal-4" className="btn btn-primary">
            Instructions
          </label>
  
          <LuutChargeStations />
  
          <div className="flex">
            <Notification />
            <TicketCount  />
          </div>
        </div>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">How it works</h3>
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              consectetur quae dolores provident modi nobis ex quia illum
              dignissimos, dicta accusantium deleniti minus soluta voluptas
              maiores nesciunt aspernatur architecto obcaecati!
            </p>
          </label>
        </label>
      </div>
    );
};

export default VisitorDashboard;
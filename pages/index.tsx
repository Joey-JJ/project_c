import { useContext } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import TicketCount from "../components/TicketCount";

import { supabase } from "../utils/supabaseClient";
import { sessionContext } from "../context/sessionContext";
import LuutChargeStations from "../components/LuutChargeStations";

const Home: NextPage = () => {
  const { session }: any = useContext(sessionContext);

  return (
    <div className="bg-[rgb(65,107,128)] py-32">
      <div className="container mx-auto min-h-screen flex flex-col items-center gap-10 bg-[rgb(65,107,128)]">
        <Image
          src={require("./../public/logo_loods.png")}
          alt="Logo loods"
          width={300}
          height={200}
        />
        <p>Logged in as: {session.user.email}</p>
        <TicketCount></TicketCount>
        <LuutChargeStations />
        <button
          onClick={() => supabase.auth.signOut()}
          className="btn btn-primary"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};
/*{session.user.email}, bij logged in as: als je magic link weer aanzet*/
export default Home;
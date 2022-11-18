import { useContext } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Register from "../components/Register";
import TicketCount from "../components/TicketCount"

import { supabase } from "../utils/supabaseClient";
import { sessionContext } from "../context/sessionContext";

const Home: NextPage = () => {
  const { session }: any = useContext(sessionContext);

  return (
    <div className="container mx-auto min-h-screen flex flex-col mt-32 items-center gap-10">
      <Image
        src={require("./../public/logo_loods.png")}
        alt="Logo loods"
        width={300}
        height={200} />
      <p>Logged in as: {session.user.email}</p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="btn btn-primary"
      >
        Sign out
      </button>
    </div>
  );
};
/*{session.user.email}, bij logged in as: als je magic link weer aanzet*/
export default Home;

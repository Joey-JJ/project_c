import { useContext } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import TicketCount from "../components/TicketCount";
import UserInfoAdmin from "../components/UserInfoAdmin";
import { supabase } from "../utils/supabaseClient";
import { sessionContext } from "../context/sessionContext";
import AdminInfo from "../components/AdminInfo";


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
        
        
       
        
          <div className=" flex flex-row container mx-auto min-h-screen gap-10 bg-[rgb(65,107,128)]">
          <div><AdminInfo /></div>
          <div><UserInfoAdmin /></div>
        </div>
        
        
       
        
       
       
      </div>
      
    </div>
    
    
  );
};
/*{session.user.email}, bij logged in as: als je magic link weer aanzet*/
export default Home;

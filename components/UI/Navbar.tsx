import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { supabase } from "../../utils/supabaseClient";
import { sessionContext } from "../../context/sessionContext";
import { useContext } from "react";

const Navbar: React.FC = ({ children }: any) => {
  const { session }: any = useContext(sessionContext);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Navbar content */}
      <div className="drawer-content">
        <nav className="navbar bg-base-100 border-2 flex justify-between items-center">
          {session && (
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button text-2xl"
            >
              <AiOutlineMenu />
            </label>
          )}
          {!session && <div className="w-14" />}
          <Link href="/">
            <Image
              src={require("./../../public/logo_loods.png")}
              height={50}
              width={75}
              alt="Logo loods"
              className="cursor-pointer"
            />
          </Link>
          <div className="w-12" />
        </nav>
        {children}
      </div>

      {/* Drawer content */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <a>Help</a>
          </li>
          <li>
            {/* redirect to account info page */}
            <Link href="/AccountInfo" replace>
              <a>Account information</a>
            </Link>
          </li>
          <li>
            <a onClick={async () => await supabase.auth.signOut()}>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

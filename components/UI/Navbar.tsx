import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { supabase } from "../../utils/supabaseClient";
import { useContext } from "react";
import { useSessionContext } from "../../context/sessionContext";

interface NavProps {
  children: React.ReactNode; // 👈️ type children
}

const Navbar: React.FC<NavProps> = ({ children }: any) => {
  const { session } = useSessionContext();

  const isAdmin =
    session?.user.email?.toLowerCase() === "caverobeheerder@gmail.com"
      ? true
      : false;

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Navbar content */}
      <div className="drawer-content">
        <nav className="navbar bg-base-100 border-2 flex justify-between items-center pl-0 pr-2.5">
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
            <>
              <Image
                src={require("./../../public/logo_loods.png")}
                height={50}
                width={75}
                alt="Logo loods"
                className="cursor-pointer"
              />
            </>
          </Link>
          <div className="w-12" />
        </nav>
        {children as any}
      </div>

      {/* Drawer content */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-40 min-[420px]:w-60 md:w-80 bg-base-100 text-base-content">
          <li>
            <Link href="/">Home</Link>
          </li>
          {!isAdmin && (
            <li>
              {/* redirect to account info page */}
              <Link href="/AccountInfo" replace>
                <a>Account information</a>
              </Link>
            </li>
          )}
          {isAdmin && (
            <>
              <li>
                <Link href="/AdminInfo">
                  <a>User Accounts</a>
                </Link>
              </li>
              <li>
                <Link href="/AdminAccountToevoegen">
                  <a>Add Account</a>
                </Link>
              </li>
            </>
          )}
          <li>
            <a onClick={async () => await supabase.auth.signOut()}>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

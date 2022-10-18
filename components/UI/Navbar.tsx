import Image from "next/image";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar: React.FC = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Navbar content */}
      <div className="drawer-content">
        <nav className="navbar bg-base-100 border-2 flex justify-between items-center">
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost drawer-button text-2xl"
          >
            <AiOutlineMenu />
          </label>
          <Image
            src={require("./../../public/logo_loods.png")}
            height={50}
            width={75}
            alt="Logo loods"
          />
          <div />
        </nav>
      </div>

      {/* Drawer content */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <a>Help</a>
          </li>
          <li>
            <a>Account information</a>
          </li>
          <li>
            <a>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

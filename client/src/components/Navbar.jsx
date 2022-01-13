import React, { useContext, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AuthenticationContext } from "../context/AuthenticationContext";
import DropDown from "./DropDown";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import DecoratedLink from "../patterns/DecoratedLink";
import { FaHome } from "react-icons/fa";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { token, logOut } = useContext(AuthenticationContext);
  const { connectedAccount } = useContext(PropertyHandlingContext);


  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/" className="flex flex-row">
          <p className="text-white text-3xl shadow font-bold " >HOMEBLOCKS</p>
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <DecoratedLink to="map">
          View on map
        </DecoratedLink>
        <DecoratedLink to="viewProperties">
          View properties
        </DecoratedLink>

        {!token && <>
          <DecoratedLink to="signUp">
            SignUp
          </DecoratedLink>
          <DecoratedLink to="login">
            Login
          </DecoratedLink>
        </>}
        {token && <>
          <DecoratedLink to="chats">
            Chats
          </DecoratedLink>
          <DecoratedLink to="manageProperties">
            Manage properties
          </DecoratedLink>
          <li className="py-2 px-7 mx-4 rounded-full cursor-pointer">
            <DropDown logOut={logOut} account={connectedAccount} />
          </li>

        </>}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


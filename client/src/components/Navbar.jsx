import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthenticationContext } from "../context/AuthenticationContext";
import DropDown from "./DropDown";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import DecoratedLink from "../shared-components/DecoratedLink";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const { token, logOut } = useContext(AuthenticationContext);
  const { connectedAccount } = useContext(PropertyHandlingContext);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/" className="flex flex-row">
          <p className="text-white text-3xl shadow font-bold ">HOMEBLOCKS</p>
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <DecoratedLink to="map">View on map</DecoratedLink>
        <DecoratedLink to="viewProperties">View properties</DecoratedLink>

        {!token && (
          <>
            <DecoratedLink to="signUp">Sign up</DecoratedLink>
            <DecoratedLink to="login">Login</DecoratedLink>
          </>
        )}
        {token && (
          <>
            <DecoratedLink to="chats">Chats</DecoratedLink>
            <DecoratedLink to="manageProperties">
              Manage properties
            </DecoratedLink>
            <li className="py-2 px-7 mx-4 rounded-full cursor-pointer">
              <DropDown logOut={logOut} account={connectedAccount} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

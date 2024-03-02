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
    <nav className="w-full flex flex-col md:flex-row md:justify-center md:justify-between md:items-center md:p-4">
      <div className="md:flex-[0.5] flex-col md:flex-row flex-initial justify-center items-center">
        <Link to="/" className="flex flex-row">
          <p className="text-white text-3xl shadow font-bold ">HOMEBLOCKS</p>
        </Link>
      </div>
      <ul className="text-white flex flex-col md:flex-row">
        <DecoratedLink to="map">View on map</DecoratedLink>
        <DecoratedLink to="viewProperties">View properties</DecoratedLink>

        {!token() && (
          <>
            <DecoratedLink to="signUp">Sign up</DecoratedLink>
            <DecoratedLink to="login">Login</DecoratedLink>
          </>
        )}
        {token() && (
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

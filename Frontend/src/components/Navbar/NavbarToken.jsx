import React from "react";
import { Link } from "react-router-dom";
// import downarrow from '../../assets/down-arrow.png'

const NavbarToken = ({ logo, username, image }) => {
  return (
    <>
      <div className="container-lg bg-primary">
        <div className="container flex justify-between py-5">
          <div className="navbar-brand pl-28">
            <Link to={"#/"} className="text-2xl text-white font-bold">
              {logo}
            </Link>
          </div>
          <div className="flex justify-center align-middle">
            <p className="pr-3 text-white">Hi, {username}</p>
            <img src={image} alt="profile" className="profile mr-5" />
            {/* <img src={downarrow} alt="" className='' /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarToken;

import React from "react";
import { Link } from "react-router-dom";
import downarrow from "../../assets/down-arrow.png";
import "./navbar.css";

function Navbar(props) {
  const { logo, username, image, countdown } = props;
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

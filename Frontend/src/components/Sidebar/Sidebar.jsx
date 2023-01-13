import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import NavbarToken from "../Navbar/NavbarToken";
import logo from "../../assets/logo.png";
import control from "../../assets/control.png";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import bankSoal from "../../assets/svg/bankSoal.svg";
import createSoal from "../../assets/svg/createSoal.svg";
import createUjian from "../../assets/svg/createUjian.svg";
import reportUjian from "../../assets/svg/reportUjian.svg";
import endSession from "../../assets/svg/endSession.svg";
import logout from "../../assets/svg/logout.svg";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState();
  const [username, setUsername] = useState();
  const [activeTabs, setActiveTabs] = useState(0);
  const Menus = [
    { title: "Create Soal", src: [createSoal], to: "/guru/create-soal" },
    { title: "Bank Soal", src: [bankSoal], to: "/guru/bank-soal" },
    { title: "Create Ujian", src: [createUjian], to: "/guru/create-ujian" },
    { title: "Report Ujian", src: [reportUjian], to: "/guru/report-ujian" },
  ];

  const navigate = useNavigate;

  const MySwal = withReactContent(Swal);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setImage(res.data.data.avatar);
      setUsername(res.data.data.nama);
      console.log("avatar", res.data.data.avatar);
      console.log("nama", res.data.data.nama);
    } catch (error) {
      console.log("gagal fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    MySwal.fire({
      title: "Log Out Berhasil",
      icon: "success",
    });
    localStorage.clear();
    navigate("/login");
  };

  const handleEndSession = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8080/api/guru/kill-ujian", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("Berhasil Kill ujian", res);

      MySwal.fire({
        title: "Sesi Ujian Berakhir",
        icon: "success",
      });
    } catch (error) {
      MySwal.fire({
        title: "Gagal Mengakiri Sesi Ujian",
        icon: "error",
      });
      console.log("Tidak berhasil end session", error);
    }
  };

  return (
    <div className="flex">
      <div className="sticky top-0 h-screen">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            alt=""
            src={control}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              alt=""
              src={logo}
              style={{ width: "50px" }}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Exam Time
            </h1>
          </div>
          <ul className="mt-5">
            {Menus.map((Menu, index) => (
              <NavLink
                key={Menu.to}
                to={Menu.to}
                className={`flex mt-2 transition duration-300 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                  index === activeTabs
                    ? "bg-light-white"
                    : "hover:bg-light-white"
                }`}
                onClick={() => setActiveTabs(index)}
              >
                <img src={Menu.src} alt="menu icon" style={{ width: "25px" }} />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left transition duration-200`}
                >
                  {Menu.title}
                </span>
              </NavLink>
            ))}
            <li>
              <div
                className="hover:bg-orange-400 transition duration-300 mt-8 cursor-pointer flex rounded-md gap-x-4 p-2"
                onClick={handleEndSession}
              >
                <img
                  src={endSession}
                  alt="End Session"
                  style={{ width: "25px" }}
                />
                <a
                  href="#/"
                  className={` ${
                    !open && "hidden"
                  } origin-left transition duration-200 text-white`}
                >
                  Akhiri Ujian
                </a>
              </div>
            </li>
            <li>
              <a
                href="/login"
                className="bg-white text-red-700 flex transiton duration-300 group relative cursor-pointer mt-4 rounded-md p-2 gap-x-4"
                onClick={handleLogout}
              >
                <span className="absolute top-0 left-0 flex h-full w-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 rounded-md bg-red-700 group-hover:w-full opacity-90"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#b91c1c"
                  className="w-6 h-6 group-hover:stroke-white relative"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left transition duration-200 text-red-700 group-hover:text-white relative`}
                >
                  Log Out
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <main className="flex-1">
        <NavbarToken username={username} image={image} />
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Sidebar;

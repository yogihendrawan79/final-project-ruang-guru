import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import NavbarToken from "../Navbar/NavbarToken";
import logo from "../../assets/logo.png";
import control from "../../assets/control.png";
import { useNavigate } from "react-router-dom";
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
              <div
                className="bg-red-700 transiton duration-300 hover:opacity-50 flex cursor-pointer mt-4 rounded-md p-2 gap-x-4"
                onClick={handleLogout}
              >
                <img src={logout} alt="" style={{ width: "25px" }} />
                <a
                  href="/login"
                  className={`${
                    !open && "hidden"
                  } origin-left transition duration-200 text-white`}
                >
                  Log Out
                </a>
              </div>
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

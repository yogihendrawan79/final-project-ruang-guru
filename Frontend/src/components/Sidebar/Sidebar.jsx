import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarToken from "../Navbar/NavbarToken";
import logo from "../../assets/logo.png";
import control from "../../assets/control.png";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Bank Soal", src: "User", gap: true },
    { title: "Buat Soal", src: "Search" },
    { title: "Report Nilai", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fHN0dWRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      username: "Yani",
    },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
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
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`../../assets/icon/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1">
        {data.map((index) => (
          <NavbarToken
            key={index.username}
            username={index.username}
            image={index.image}
          />
        ))}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Sidebar;

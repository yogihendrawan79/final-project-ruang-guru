import React from "react";
import Navbar from "../../Navbar/Navbar";
import Card from "./CardBank/Card";

const BankSoal = () => {
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fHN0dWRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      username: "Yani",
    },
  ];

  const bank = [
    {
      mapel: "Matematika",
      durasi: "30",
      token: "asdfjaslkj",
      deadline: "2020-01-01",
    },
  ];

  return (
    <>
      {data.map((index) => (
        <Navbar
          key={index.username}
          logo=".ET"
          username={index.username}
          image={index.image}
        />
      ))}
      {bank.map((index) => (
        <Card
          key={index.mapel}
          mapel={index.mapel}
          durasi={index.durasi}
          token={index.token}
          deadline={index.deadline}
        />
      ))}
    </>
  );
};

export default BankSoal;

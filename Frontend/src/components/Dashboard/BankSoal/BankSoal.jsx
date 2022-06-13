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
      id: "1",
      mapel: "Matematika",
    },
    {
      id: "2",
      mapel: "IPA",
    },
    {
      id: "3",
      mapel: "IPS",
    },
    {
      id: "4",
      mapel: "Fisika",
    },
    {
      id: "5",
      mapel: "Kimia",
    },
    {
      id: "6",
      mapel: "B. Indonesia",
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
      <div className="flex justify-start">
        <div className="grid grid-cols-5">
          {bank.map((index) => (
            <Card key={index.id} mapel={index.mapel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BankSoal;

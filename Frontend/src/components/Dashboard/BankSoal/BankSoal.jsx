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
      durasi: "30",
      token: "asdfjaslkj",
      deadline: "2020-01-01",
    },
    {
      id: "2",
      mapel: "IPA",
      durasi: "30",
      token: "ksjkjsdkjf",
      deadline: "2020-01-01",
    },
    {
      id: "3",
      mapel: "IPS",
      durasi: "30",
      token: "jksjkdfjk",
      deadline: "2020-01-01",
    },
    {
      id: "4",
      mapel: "Fisika",
      durasi: "30",
      token: "jksdfjkfj",
      deadline: "2020-01-01",
    },
    {
      id: "5",
      mapel: "Kimia",
      durasi: "30",
      token: "awisksksk",
      deadline: "2020-01-01",
    },
    {
      id: "6",
      mapel: "B. Indonesia",
      durasi: "30",
      token: "lakjsdfkfj",
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
      <div className="flex justify-start">
        <div className="grid grid-cols-5">
          {bank.map((index) => (
            <Card
              key={index.id}
              mapel={index.mapel}
              durasi={index.durasi}
              token={index.token}
              deadline={index.deadline}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BankSoal;

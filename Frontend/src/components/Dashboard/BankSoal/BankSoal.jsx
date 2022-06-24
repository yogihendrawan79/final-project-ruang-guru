import React from "react";
import Card from "./CardBank/Card";

const BankSoal = () => {
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

  // const fetchMapel = async () => {
  //   try {

  //   } catch (error) {
  //     console.log("Gagal fetch data", error
  //   }
  // }

  return (
    <>
      <div className="flex justify-start">
        <div className="grid grid-cols-5 mr-5">
          {bank.map((index) => (
            <Card key={index.id} mapel={index.mapel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BankSoal;

import "./App.css";
import Soal from "./components/Soal/Soal";
import { Routes, Route } from "react-router-dom";
import Result from "./components/Result/Result";
import Login from "./components/Login/Login";
import Token from "./components/Token/Token";
import BankSoal from "./components/Dashboard/BankSoal/BankSoal";

function App() {
  return (
    <div className="">
      <Routes>
        <Route index path="/" element={<Soal />} />
        <Route path="login" element={<Login />} />
        <Route path="token" element={<Token />} />
        <Route path="hasil-ujian" element={<Result />} />
          {/* <Route index path=":mapel" element={<Result />} /> */}
        {/* </Route> */}
        <Route path="/dashboard/:id">
          {/* Sisanya disesuaikan */}
          <Route index path="/dashboard/:id/bank-soal" element={<BankSoal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

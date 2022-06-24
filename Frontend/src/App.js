import "./App.css";
import Soal from "./components/Soal/Ujian";
import { Routes, Route } from "react-router-dom";
import Result from "./components/Result/Result";
import Login from "./components/Login/Login";
import LoginGuru from "./components/LoginGuru/Login";
import Token from "./components/Token/Token";
import Sidebar from "./components/Sidebar/Sidebar";
import BankSoal from "./components/Dashboard/BankSoal/BankSoal";
import Bank from "./components/Dashboard/BankSoal/Bank/Bank";
import AddBank from "./components/Dashboard/BankSoal/Add/AddForm";
import CreateSoal from "./components/Dashboard/CreateSoal/CreateSoal";
import NewSoal from "./components/Dashboard/CreateSoal/Forms/Form";

function App() {
  return (
    <div className="">
      <Routes>
        <Route index path="/" element={<Soal />} />
        <Route path="login" element={<Login />} />
        <Route path="login-guru" element={<LoginGuru />} />
        <Route path="token" element={<Token />} />
        <Route path="hasil-ujian">
          <Route index path=":mapel" element={<Result />} />
        </Route>
        <Route path="/guru" element={<Sidebar />}>
          <Route path="bank-soal" element={<BankSoal />} />
          <Route path="bank" element={<Bank />} />
          <Route path="update-bank" element={<AddBank />} />
          <Route path="create-ujian" element={<CreateSoal />} />
          <Route path="new-soal" element={<NewSoal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

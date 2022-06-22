import "./App.css";
import Soal from "./components/Soal/Soal";
import { Routes, Route } from "react-router-dom";
import Result from "./components/Result/Result";
import Login from "./components/Login/Login";
import LoginGuru from "./components/LoginGuru/Login";
import Token from "./components/Token/Token";
import Sidebar from "./components/Sidebar/Sidebar";

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
        <Route path="/guru">
          <Route index path="/guru/dashboard" element={<Sidebar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

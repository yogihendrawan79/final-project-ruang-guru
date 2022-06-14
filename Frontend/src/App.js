import './App.css';
import Soal from './components/Soal/Soal';
import { Routes, Route } from 'react-router-dom'
import Result from './components/Result/Result';
import Login from './components/Login/Login';
import Token from './components/Token/Token';
import BankSoal from './components/Dashboard/BankSoal/BankSoal'

function App() {
  return (
      <div className="">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="token" element={<Token />} />
          <Route index element={<Soal />} />
          <Route path='hasil-ujian'>
            <Route index path=":id" element={<Result />} />
          </Route>
          <Route path='/dashboard/:id'>
            {/* Sisanya disesuaikan */}
            <Route index path="/dashboard/:id/bank-soal" element={<BankSoal />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Admin/Login';
import Admin from './Components/Admin/Admin';
import User from './Components/Web/User';
import NotFound from './Components/Admin/NotFound';
import Amazon from './Components/Admin/Amazon';
import Flipkart from './Components/Admin/Flipkart';
import Myntra from './Components/Admin/Myntra';
import PSinfo from './Components/Admin/PSinfo';
import PCinfo from './Components/Admin/PCinfo';
import PSalloted from './Components/Admin/PSalloted';
import PTinfo from './Components/Admin/PTinfo';
import Clients from './Components/Admin/Clients';
import TCS from './Components/Admin/TCS';
import IBM from './Components/Admin/IBM';
import DELL from './Components/Admin/DELL';
import ERSellerinfo from './Components/Admin/ERSellerinfo';
import Sellerinfo from './Components/Admin/sellerinfo';
import EMPinfo from './Components/Admin/EMPinfo';
import Ginfo from './Components/Admin/Ginfo';
import Ninfo from './Components/Admin/Ninfo';
function App() {
  return (
    <Router>
      <Routes>   
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/amazon" element={<Amazon />} />
        <Route path="/flipkart" element={<Flipkart />} />
        <Route path="/myntra" element={<Myntra />} />
        <Route path="/psinfo" element={<PSinfo />} />
        <Route path="/pcinfo" element={<PCinfo />} />
        <Route path="/psalloted" element={<PSalloted />} />
        <Route path="/ptinfo" element={<PTinfo />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/tcs" element={<TCS />} />
        <Route path="/ibm" element={<IBM />} />
        <Route path="/dell" element={<DELL />} />
        <Route path="/ersellerinfo" element={<ERSellerinfo />} />
        <Route path="/sellerinfo" element={<Sellerinfo />} />
        <Route path="/empinfo" element={<EMPinfo />} />
        <Route path="/ginfo" element={<Ginfo />} />
        <Route path="/ninfo" element={<Ninfo />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

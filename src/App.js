import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Admin/Login';
import Admin from './Components/Admin/Admin';
import User from './Components/Web/User';
import NotFound from './NotFound';
import Amazon from './Components/Admin/Sellerinfo/Amazon';
import Flipkart from './Components/Admin/Sellerinfo/Flipkart';
import Myntra from './Components/Admin/Sellerinfo/Myntra';
import Clients from './Components/Admin/Clients';
import TCS from './Components/Admin/Clientinfo/TCS';
import IBM from './Components/Admin/Clientinfo/IBM';
import DELL from './Components/Admin/Clientinfo/DELL';
import Sellerinfo from './Components/Admin/sellerinfo';
import EMPinfo from './Components/Admin/EMPinfo';

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
     
        <Route path="/clients" element={<Clients />} />
        <Route path="/tcs" element={<TCS />} />
        <Route path="/ibm" element={<IBM />} />
        <Route path="/dell" element={<DELL />} />
        <Route path="/sellerinfo" element={<Sellerinfo />} />
        <Route path="/empinfo" element={<EMPinfo />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Admin/Login';
import Admin from './Components/Admin/Admin';
import User from './Components/Web/User';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>   
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

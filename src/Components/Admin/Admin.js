import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CubeIcon from '@mui/icons-material/ViewInAr';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function Admin() {
  const [isNavigationActive, setNavigationActive] = useState(false);

  const toggleNavigation = () => {
    setNavigationActive(!isNavigationActive);
  };

  return (
    <div>
      {/* Navigation */}
      <div className={`navigation ${isNavigationActive ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/dashboard">
              <div className="icon">
                <HomeIcon />
              </div>
              <div className="title">Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <div className="icon">
                <CubeIcon />
              </div>
              <div className="title">Products</div>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <div className="icon">
                <ReceiptIcon />
              </div>
              <div className="title">Orders</div>
            </Link>
          </li>
          <li>
            <Link to="/customers">
              <div className="icon">
                <PeopleIcon />
              </div>
              <div className="title">Customers</div>
            </Link>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main ${isNavigationActive ? 'active' : ''}`}>
        {/* Topbar */}
        <div className="topbar">
          {/* Toggle Button */}
          <div className="toggle" onClick={toggleNavigation}>
            <MenuIcon />
          </div>

          {/* Search */}
          <div className="search">
            <label>
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </label>
          </div>

          {/* User Avatar */}
          <div className="user">
            <img src="user-avatar.jpg" alt="User Avatar" />
          </div>
        </div>

        {/* Card Box */}
        <div className="cardBox">
          <div className="card">
            <div className="numbers">123</div>
            <div className="cardName">Total Orders</div>
            <div className="iconBx">
              {/* Add the appropriate Material-UI icon here */}
            </div>
          </div>
          {/* Add more card components as needed */}
        </div>

        {/* Charts Box */}
        <div className="chartsBx">
          <div className="chart">{/* Chart component goes here */}</div>
        </div>

        {/* Order Details List */}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Recent Orders</h2>
              <Link to="/all-orders" className="btn">
                View All
              </Link>
            </div>
            <table>{/* Table content goes here */}</table>
          </div>
        </div>

        {/* ... Other components go here ... */}
      </div>
    </div>
  );
}

export default Admin;

import React from 'react';
import './Overview.css'; // Import the CSS file for Overview

const Overview = ({ totalUsers, activeUsers, inactiveUsers }) => {
  return (
    <div className="overview-container">
      <div className="total-users-card">
        <h3>Total Users</h3>
        <p id='p-o'>{totalUsers}</p>
      </div>
      <div className="status-cards">
        <div className="overview-card active-users-card">
          <h3>Active Users</h3>
          <p>{activeUsers}</p>
        </div>
        <div className="overview-card inactive-users-card">
          <h3>Inactive Users</h3>
          <p>{inactiveUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;

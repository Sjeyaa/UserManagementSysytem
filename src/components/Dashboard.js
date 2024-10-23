import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/overview" className="sidebar-link">Overview</Link>
          <Link to="/users/create" className="sidebar-link">Create User</Link>
          <Link to="/users" className="sidebar-link">List Users</Link>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
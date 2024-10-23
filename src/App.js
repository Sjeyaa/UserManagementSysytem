import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserListPage from './pages/UserListPage';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import Overview from './components/Overview';

function App() {
  const [users, setUsers] = useState([]);

  // Calculate active and inactive users
  const totalActiveUsers = users.filter(user => user.status).length;
  const totalInactiveUsers = users.filter(user => !user.status).length;

  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers((prevUsers) => [...prevUsers, userWithId]);
    return userWithId; // Return the new user with ID
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <Router>
      <Dashboard>
        <Routes>
          {/* Set the landing page to the Overview component */}
          <Route 
            path="/" 
            element={<Overview 
              totalUsers={users.length} 
              activeUsers={totalActiveUsers} 
              inactiveUsers={totalInactiveUsers} 
            />} 
          />
          <Route 
            path="/overview" 
            element={<Overview 
              totalUsers={users.length} 
              activeUsers={totalActiveUsers} 
              inactiveUsers={totalInactiveUsers} 
            />} 
          />
          <Route 
            path="/users" 
            element={<UserListPage users={users} setUsers={setUsers} />} 
          />
          <Route 
            path="/users/create" 
            element={<CreateUser addUser={addUser} />} 
          />
          <Route 
            path="/users/edit/:id" 
            element={<EditUser users={users} updateUser={updateUser} />} 
          />
        </Routes>
      </Dashboard>
    </Router>
  );
}

export default App;

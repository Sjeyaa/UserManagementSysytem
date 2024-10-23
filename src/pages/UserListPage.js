import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../services/api';
import Pagination from '../components/Pagination';
import './UserListPage.css'; // Import the new CSS file

const UserListPage = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch users only if not already available
    if (users.length === 0) {
      fetchUsers()
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [users, setUsers]);

  // Filtering logic
  const filteredUsers = users.filter(user => {
    const isActive = filterStatus === 'active' ? user.status : filterStatus === 'inactive' ? !user.status : true;
    const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    return isActive && matchesSearchTerm;
  });

  // Sorting logic
  const sortedUsers = filteredUsers.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortOrder === 'asc') {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
        .then(() => {
          setUsers(users.filter(user => user.id !== id)); // Update UI after deleting
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  return (
    <div className="user-list">
      <h2>User List</h2>

      {/* Filter Options */}
      <div className="filter-options">
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">None</option>
          <option value="asc">Sort by Name (A-Z)</option>
          <option value="desc">Sort by Name (Z-A)</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.status ? 'Active' : 'Inactive'}</td>
              <td>
                <Link to={`/users/edit/${user.id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={sortedUsers.length} // Updated to use sorted users for pagination
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default UserListPage;

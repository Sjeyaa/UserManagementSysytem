import React, { useState, useEffect } from 'react';
import './UserForm.css'; // Import the CSS file

const UserForm = ({ initialUser, onSubmit, buttonLabel }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    status: false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialUser) {
      setUser({
        name: initialUser.name || '',
        email: initialUser.email || '',
        phone: initialUser.phone || '',
        status: initialUser.status !== undefined ? initialUser.status : false,
      });
    }
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === 'status' ? (value === 'true') : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.phone) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit(user);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{buttonLabel}</h2>
      {error && <div className="error">{error}</div>}
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <label>Phone:</label>
      <input
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        required
      />
      <label>Status:</label>
      <select name="status" value={user.status ? 'true' : 'false'} onChange={handleChange}>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};

export default UserForm;

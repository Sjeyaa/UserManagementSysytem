import React from 'react';
import UserForm from '../components/UserForm';
import { createUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ addUser }) => {
  const navigate = useNavigate();

  const handleCreateUser = (newUser) => {
    createUser(newUser)
      .then((response) => {
        // Use the returned user from addUser which includes the ID
        const createdUser = addUser(response.data || newUser);
        navigate('/users');
      })
      .catch(err => {
        console.error('Error creating user:', err);
        // Still add user locally since API is mock
        const createdUser = addUser(newUser);
        navigate('/users');
      });
  };

  return (
    <div>
      
      <UserForm onSubmit={handleCreateUser} buttonLabel="Create User" />
    </div>
  );
};

export default CreateUser;
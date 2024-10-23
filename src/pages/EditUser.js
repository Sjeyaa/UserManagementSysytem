import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { updateUser as apiUpdateUser } from '../services/api';

const EditUser = ({ users, updateUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find user from local state instead of making API call
  const userToEdit = users.find(user => 
    // Convert both to same type for comparison
    user.id === (typeof id === 'string' ? parseInt(id) : id)
  );

  const handleUpdateUser = (updatedUserData) => {
    const updatedUser = { ...updatedUserData, id: userToEdit.id };
    
    apiUpdateUser(id, updatedUser)
      .then(() => {
        updateUser(updatedUser); // Update local state
        navigate('/users');
      })
      .catch(err => {
        console.error('Error updating user:', err);
        // Update local state anyway since API is mock
        updateUser(updatedUser);
        navigate('/users');
      });
  };

  return (
    <div>
      
      {userToEdit ? (
        <UserForm 
          initialUser={userToEdit} 
          onSubmit={handleUpdateUser} 
          buttonLabel="Update User" 
        />
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default EditUser;
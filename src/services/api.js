import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => axios.get(API_URL);

export const createUser = (user) => {
  // Add ID to new user since jsonplaceholder might not
  const userWithId = { ...user, id: Date.now() };
  return axios.post(API_URL, userWithId);
};

export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
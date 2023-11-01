// AdminDashboard.js
import React from 'react';
import CategoryCreationForm from '../components/CategoryCreationForm';
import UserStatus from '../components/Navbar';

function AdminDashboard() {
  return (
    <div>
      <UserStatus/>
      <h1>Welcome to the Admin Dashboard</h1>
      <CategoryCreationForm/>
    </div>
  );
}

export default AdminDashboard;

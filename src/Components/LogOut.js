import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log('Failed to log out');
    }
  };

  return (
    <div>
      <h1>Log Out</h1>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default LogOut;

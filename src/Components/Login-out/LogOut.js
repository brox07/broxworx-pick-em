import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Main.css';

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
    <div className='main'>
      <h2 className='header'>Log Out</h2>
      <div className='card c'>
        <p>Are you sure you want to log out?</p>
        <button className='main-button' onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
};

export default LogOut;

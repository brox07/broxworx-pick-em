import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Navigation.css';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navigation">
      <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
        Home
      </NavLink>
      <NavLink to="/pick-em" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
        Pick Em
      </NavLink>
      <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
        Leaderboard
      </NavLink>
      <NavLink to="/picks-dashboard" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
        Picks Dashboard
      </NavLink>
      {currentUser ? (
        <>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Profile
          </NavLink>
          <NavLink to="/logout" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Log Out
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Log In
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
};


export default Navigation;

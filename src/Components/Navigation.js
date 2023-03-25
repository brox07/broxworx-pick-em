import React from 'react';
import { useAuth } from '../AuthContext';
import './Navigation.css';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navigation">
      <NavLink exact to="/" className="nav-item" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/pick-em" className="nav-item" activeClassName="active">
        Pick Em
      </NavLink>
      <NavLink to="/leaderboard" className="nav-item" activeClassName="active">
        Leaderboard
      </NavLink>
      {currentUser ? (
        <>
          <NavLink to="/profile" className="nav-item" activeClassName="active">
            Profile
          </NavLink>
          <NavLink to="/logout" className="nav-item" activeClassName="active">
            Log Out
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login" className="nav-item" activeClassName="active">
            Log In
          </NavLink>
          <NavLink to="/signup" className="nav-item" activeClassName="active">
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
};


export default Navigation;

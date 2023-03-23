import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navigation">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/pick-em" className="nav-item">
        Pick Em
      </Link>
      <Link to="/leaderboard" className="nav-item">
        Leaderboard
      </Link>
      {currentUser ? (
        <>
          <Link to="/profile" className="nav-item">
            Profile
          </Link>
          <Link to="/logout" className="nav-item">
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-item">
            Log In
          </Link>
          <Link to="/signup" className="nav-item">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;

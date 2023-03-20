import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navigation.css';

const Navigation = () => {
    //const { currentUser, logOut } = useAuth();
    
    //const handleLogOut = async ();

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
            <Link to="/profile" className="nav-item">
                Profile
            </Link>
            <Link to="/login" className="nav-item">
              Log In
            </Link>
            <Link to="/signup" className="nav-item">
               Sign Up
            </Link>
      {/* Add more navigation links as needed */}
    </nav>
    );
};

export default Navigation;
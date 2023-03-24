import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <h1>Welcome to the NFL Pick 'Em!</h1>
      <p>
        Compete with others to predict the winners of NFL games during the
        2023/2024 season!
      </p>
      {isAuthenticated && (
        <div className="home-buttons">
          <Link to="/login" className="home-button">
            Log In
          </Link>
          <Link to="/signup" className="home-button">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

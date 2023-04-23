import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  //find most active public groups to populate a "popular groups" list for first time users
  // pass it in underneath "group search"

  return (
    <div className="home">
      <h1>Welcome to Pick 'Em!</h1>
      <p>
        Compete with others to predict the winners of games from multiple leagues!
      </p>
      <br/>
      <h3>Search for a group to join</h3>
      
      <input></input>
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

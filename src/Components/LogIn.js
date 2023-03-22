import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await logIn(email, password);
      navigate('/pick-em');
    } catch (error) {
      setError('Failed to log in');
    }
  };

  return (
    <div className="home">
      <h1>Log In</h1>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <div className="home-buttons">
            <button type="submit" className="home-button">Log In</button>
          </div>
        </form>
        <div>{error && <p>{error}</p>}
          {successMessage && <p>{successMessage}</p>}
          <p>Forget your password? <Link to="/resetPassword">Click here to reset it.</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

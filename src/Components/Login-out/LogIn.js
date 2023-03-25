import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import '../Main.css';
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
    // console.log('Email:', email);
    // console.log('Password:', password);
    try {
      setError('');
      await logIn(email, password);
      navigate('/pick-em');
    } catch (error) {
      console.error('Failed to log in:', error);
      setError('Failed to log in');
    }
  };

  return (
    <div className="main c">
      <h2 className='header'>Log In</h2>
      <div className="card">
        <div className="single-form-box">
          <form onSubmit={handleSubmit}>
            <div className="single-form-grid">
              <div className="single-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="single-form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="main-button">Log In</button>
            </div>
          </form>
        </div>
        <div>{error && <p>{error}</p>}
          {successMessage && <p>{successMessage}</p>}
          <p className='m'>Forget your password? <Link to="/resetPassword">Click here to reset it.</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

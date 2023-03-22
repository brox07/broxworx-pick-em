import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      setError('');
      await signUp(email, password);
      navigate('/login');
    } catch (error) {
      setError('Failed to create an account');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(e.target.checkValidity());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.checkValidity());
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordConfirmValid(e.target.value === password);
  };


  return (
    <div className="home">
      <h1>Sign Up</h1>
      <h3>Please fill out the form below to create a FREE account.</h3>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@example.com"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className={emailValid ? "valid" : ""}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Type your password"
            required
            className={passwordValid ? "valid" : ""}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder="Once more, for luck"
            required
            className={passwordConfirmValid ? "valid" : ""}
          />

          <div className="home-buttons">
            <button type="submit" className="home-button">
              Sign Up
            </button>
          </div>
        </form>
        <div>
          {error && <p>{error}</p>}
          <p>Already have an account? <Link to="/login">Click here to login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

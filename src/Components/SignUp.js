import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { db } from "../firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        name,
        email,
        dateOfBirth,
        phoneNumber,
        state,
        favoriteTeam,
      };

      await setDoc(doc(db, "users", userCredential.user.uid), user);

      console.log("User created with ID: ", userCredential.user.uid);
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create an account");
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleFavoriteTeamChange = (e) => {
    setFavoriteTeam(e.target.value);
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

          <label>Name*</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your name"
            required
          />

          <label>Date of Birth*</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Your phone number"
          />

          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={handleStateChange}
            placeholder="Your state"
          />

          <label>Favorite Team</label>
          <input
            type="text"
            value={favoriteTeam}
            onChange={handleFavoriteTeamChange}
            placeholder="Your favorite team"
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

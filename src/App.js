import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import LogIn from './components/Login-out/LogIn';
import LogOut from './components/Login-out/LogOut';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import PickEm from './components/PickEm/PickEm';
import Leaderboard from './components/Leaderboard/Leaderboard';
import PicksDashboard from './components/PicksDashboard/PicksDashboard';
import ResetPassword from './components/ResetPassword/ResetPassword'; // add the new import
import Footer from './components/Footer/Footer'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/pick-em" element={<PickEm />} />
            <Route path="/picks-dashboard" element={<PicksDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/resetpassword" element={<ResetPassword />} /> // add the new route
            <Route path="/footer" element={<Footer />} /> // add the new route
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

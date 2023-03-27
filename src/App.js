import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/Home';
import LogIn from './Components/Login-out/LogIn';
import LogOut from './Components/Login-out/LogOut';
import SignUp from './Components/SignUp/SignUp';
import Profile from './Components/Profile/Profile';
import PickEm from './Components/PickEm/PickEm';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import MLSPickEm from './Components/MLSPickEm';
import ResetPassword from './Components/ResetPassword/ResetPassword'; // add the new import
import Footer from './Components/Footer/Footer'; 

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
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/mls-pick-em" element={<MLSPickEm />} />
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

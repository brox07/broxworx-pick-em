import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Navigation from './Components/Navigation';
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import LogOut from './Components/LogOut';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import PickEm from './Components/PickEm';
import MLSPickEm from './Components/MLSPickEm';
import ResetPassword from './Components/ResetPassword'; // add the new import

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/mls-pick-em" element={<MLSPickEm />} />
            <Route path="/resetpassword" element={<ResetPassword />} /> // add the new route
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

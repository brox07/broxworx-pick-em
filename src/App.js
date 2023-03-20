import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Navigation from './Components/Navigation';
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import PickEm from './Components/PickEm';
import MLSPickEm from './Components/MLSPickEm';
// Import other necessary components

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
            <Route path="/mls-pick-em" element={<MLSPickEm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar.jsx';
import SignupForm from './components/Signup.jsx'; // Remove the comment and import the SignupForm component
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} /> 
            <Route exact path="/signup" element={<SignupForm />} /> 

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
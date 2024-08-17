import React from 'react';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import RegistrationForm from './components/Signup.jsx'; // Remove the comment and import the SignupForm component
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapContainer from './components/Map/Map.jsx';
function App() {
  return (
    <Router>
      <div className="App">
          <Navbar />
            <div className="content">
            <Routes>
                <Route exact path="/" element={<Home />} /> 
                <Route exact path="/signup" element={<RegistrationForm/>} /> 
                <Route exact path ='/map' element ={<MapContainer />}/>

            </Routes>
            </div>
      </div>
    </Router>
  );
}

export default App;

// TODO: </Routes><Router exact path='/map'element={</>}/>


import React from 'react';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import RegistrationForm from './components/Register/Signup.jsx'; // Remove the comment and import the SignupForm component
import RegistrationOtp from './components/Register/SignupOTP.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapContainer from './components/Map/Map.jsx';
import Test from './components/Test.jsx'

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3300', // your primary color
    },

    background: {
      default: '#00ccff', // your background color
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
          <Navbar />
            <div className="content">
            <Routes>
            <Route exact path="/" element={<Home />} /> 
                <Route exact path="/test" element={<Test />} /> 
                <Route exact path="/signup" element={<RegistrationForm/>} /> 
                <Route exact path ="/signup/signupotp" element= {<RegistrationOtp/>}/>
                <Route exact path ='/map' element ={<MapContainer />}/>
            </Routes>
            </div>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;

// TODO: </Routes><Router exact path='/map'element={</>}/>


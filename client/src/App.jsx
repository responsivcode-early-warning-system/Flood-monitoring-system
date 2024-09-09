//import './App.css';
import Login from './components/Login/Login';
//import Home from './components/Login/Home';
import Layout from './components/Login/Layout';
import User from './components/Login/User';
import Admin from './components/Login/Admin';
import Missing from './components/Login/Missing';
import RequireAuth from './components/Login/RequireAuth';
import LinkPage from './components/Login/LinkPage';
import Reset from './reset';
import Unauthorized from './components/Login/Unauthorized';
import PersistLogin from './components/Login/PersistLogin';

import React from 'react';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import RegistrationForm from './components/Register/Signup.jsx'; // Remove the comment and import the SignupForm component
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapContainer from './components/Map/Map.jsx';
import Test from './components/Test.jsx'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const ROLES = {
  'User': 2001,
  'Editor': 1994,
  'Admin': 5150
}

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


import Container from '@mui/material/Container';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <Navbar />
            <div className="content">
            <Routes>
            <Route exact path="/" element={<Home />} /> 
                <Route exact path="/test" element={<Test />} /> // Use the correct component name
                <Route exact path="/signup" element={<RegistrationForm/>} /> 
                
                <Route exact path ='/map' element ={<MapContainer />}/>
            </Routes>
            </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

// TODO: </Routes><Router exact path='/map'element={</>}/>

/*
 <Route path="/" element={<Layout />}>
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="Login" element={<Login />} />
        <Route path="reset" element={<Reset />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[1994, 2001]}/>}>
            <Route path="home" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[1994]}/>}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
            <Route path="user" element={<User />} />
            
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
*/
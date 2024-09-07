import React from 'react';
import Login from './components/Login/Login';
import './App.css';
import Home from './components/Login/Home';
import Layout from './components/Login/Layout';
import User from './components/Login/User';
import Admin from './components/Login/Admin';
import Missing from './components/Login/Missing';
import RequireAuth from './components/Login/RequireAuth';
import LinkPage from './components/Login/LinkPage';
import Reset from './reset';
import Unauthorized from './components/Login/Unauthorized';
import { Routes, Route } from 'react-router-dom';
import PersistLogin from './components/Login/PersistLogin';

 // Adjust the path

const ROLES = {
  'User': 2001,
  'Editor': 1994,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="Login" element={<Login />} />
        <Route path="reset" element={<Reset />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        
        {/* protected routes with persist login */}
        <Route element={<PersistLogin />}>
          {/* Protected routes for both User and Editor roles */}
          <Route element={<RequireAuth allowedRoles={[1994, 2001]}/>}>
            <Route path="home" element={<Home />} />
          </Route>

          {/* Protected routes for Editor only */}
          <Route element={<RequireAuth allowedRoles={[1994]}/>}>
            <Route path="admin" element={<Admin />} />
          </Route>

          {/* Protected routes for User only */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
            <Route path="user" element={<User />} />
            
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

import React, { useState} from 'react';
import axios from 'axios';
import { Grid, Paper, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import logo from './add-friend.png'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Link } from "react-router-dom";
import RegistrationOtp from './RegistrationOtp';

//import { useTheme } from '@mui/material/styles';

const images = {
  src: logo,
  alt:'Logo'
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    contact: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
  event.preventDefault();
  // Add your form submission logic here
  if (formData.password == formData.passwordConfirm) {
    axios.post(`http://localhost:7000/register`, formData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
    return;
  } else{
    alert('Passwords do not match');
    return
  }
};
  const paperStyle= {
    padding: 20, height:'50vh', width: 300, margin: '20px auto',  
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  }
  return (
    <div className='Form'>
        <Grid>
          <Paper square={false} elevation={10} style={paperStyle}>
          <form className='RegistrationForm'>
          <Avatar><AppRegistrationOutlinedIcon color='primary' /></Avatar>
           Registration
            <br />
              <div>
                <label>Username:</label>
                <br />
                <input
                  type="text" name="username" value={formData.username}
                  onChange={handleInputChange}  required/>
              </div>
              <div>
                <label>Contact:</label>
                
                <br />
                <input
                  type="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label>Email:</label>
                
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label>Password:</label>
                <br />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label>Confirm Password:</label>
                <br />
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <Link to="./registrationotp" state= {{formdata: formData}}>
                <Button /*onClick={handleSubmit}*/>Submit</Button>
              </Link>
            </form> 
          </Paper>
        </Grid>
      </div>
  );
};
export default RegistrationForm;
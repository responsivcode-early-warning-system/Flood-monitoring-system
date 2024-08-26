import React, { useState} from 'react';
import axios from 'axios';
import { Grid, Paper, Avatar } from '@mui/material';
import Button from '@mui/material/Button';

import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

import logo from './add-friend.png'


const images = {
  src: logo,
  alt:'Logo'
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
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
  if (formData.password !== formData.passwordConfirm) {
    alert('Passwords do not match');
    return;
  }
  console.log(formData);
  axios.post(`http://localhost:7000/register`, formData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
};
  const paperStyle= {padding: 20, height:'70vh', width: 200, margin: '20px auto',  display: 'flex', justifyContent: 'center', alignItems: 'center',}
  return (
      <div className='Form'>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
          <form className='RegistrationForm'>
          <Avatar><AppRegistrationOutlinedIcon color="primary"/></Avatar>
           Registration
              <div>
                <label>Username:</label>
                <br />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label>Given Name:</label>
                <br />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label>Middle Name:</label>
                <br />

                <input
                  type="text"
                  name="middlename"
                  value={formData.middlename}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label>Last Name:</label>
                <br />

                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                  />
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
              <Button onClick={handleSubmit}>Submit</Button>
            </form> 
          </Paper>
        </Grid>
      
      </div>
    
  );
};

/**/
//<img src={images.src} alt={images.alt} />


export default RegistrationForm;
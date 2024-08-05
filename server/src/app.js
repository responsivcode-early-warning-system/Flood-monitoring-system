var express  = require('express');
var app = express();
const cors = require('cors')
var con = require('./connection');
const sessions= require('express-session')
const cookieParser =require("cookie-parser")
app.use(cookieParser())
const bcrypt = require('bcrypt');
const saltRounds = 10; 





app.post('/register', (req, res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
  
  
  
    // Check if the password and password confirmation match
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Password and password confirmation do not match' });
    }
  
    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM newuser WHERE email = ?";
    con.query(checkEmailQuery, [email], function (error, results) {
      if (error) throw error;
  
      if (results.length > 0) {
        // Email already exists, return an error
        return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
      }
  
      // Check if the username already exists in the database
      const checkUsernameQuery = "SELECT * FROM newuser WHERE username = ?";
      con.query(checkUsernameQuery, [username], function (error, usernameResults) {
        if (error) throw error;
  
        if (usernameResults.length > 0) {
          // Username already exists, return an error
          return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
        }
  
        // Email and username are unique, proceed with hashing the password and registration
        bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
          if (err) throw err;
        // TODO: change the name of the table and the entries
          const insertUserQuery = "INSERT INTO newuser (username, email, password) VALUES (?, ?, ?)";
          con.query(insertUserQuery, [username, email, hashedPassword], function (error, result) {
            if (error) throw error;
            res.status(200).json({ message: 'Account registered successfully' });
          });
        });
      });
    });
  });





app.listen(3000, function () {

    console.log("Listening on port 3000...");     
})
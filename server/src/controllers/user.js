var con = require('../models/server.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const InsertUser = (req, res) => {
    const {username, contact, email, password, passwordConfirm} = req.body;

  // Check if the password and password confirmation match
  if (password !== passwordConfirm) {
    return res.status(400).json({ message: 'Password and password confirmation do not match' });
  }

  // Check if the email already exists in the database
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  con.query(checkEmailQuery, [email], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // Email already exists, return an error
      return res.json({ message: 'Email already exists. Please use a different email.' });
    }

    // Check if the username already exists in the database
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    con.query(checkUsernameQuery, [username], (error, usernameResults) => {
      if (error) throw error;
      if (usernameResults.length > 0) {
        // Username already exists, return an error
        return res.json({ message: 'Username already exists. Please choose a different username.' });
      }
      // Email and username are unique, proceed with hashing the password and registration
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err){
          console.log(err)
          throw err
        };
        const insertUserQuery = 'INSERT INTO users (username, contact, email, password) VALUES (?, ?, ?, ?)';
        con.query(insertUserQuery, [username, contact, email, hashedPassword], (error, result) => {
          if (error) throw error;
          res.json({ message: 'Account registered successfully' });
        });
      });
    });
  });
}

module.exports ={InsertUser};
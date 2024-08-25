var express = require('express');
const router = express.Router();


//Users endpoint

router.post('/register',(req, res)=> {
    const { username, firstname, middlename, lastname, contact, email, password, passwordConfirm } = req.body;

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
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // Check if the username already exists in the database
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    con.query(checkUsernameQuery, [username], (error, usernameResults) => {
      if (error) throw error;

      if (usernameResults.length > 0) {
        // Username already exists, return an error
        return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
      }

      // Email and username are unique, proceed with hashing the password and registration
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) throw err;

        const insertUserQuery = 'INSERT INTO users (username, firstname, middlename, lastname, contact, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        con.query(insertUserQuery, [username, firstname, middlename, lastname, contact, email, hashedPassword], (error, result) => {
          if (error) throw error;
          res.status(200).json({ message: 'Account registered successfully' });
        });
      });
    });
  });
})


module.exports = router;
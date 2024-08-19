var express = require('express');
var app = express();
const cors = require('cors');
var con = require('./server.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()

app.use(cors());
app.use(express.json());

// Example defining a route in Express
app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});

function getbyLvl(sql, res){
  con.query(sql, function(err, result) {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    console.log(result);
    res.json(result);
  });
}

app.get('/:level', (req, res) => {
  const { level } = req.params;
  let distance;

  switch (level) {
    case 'Normal':
      min=0;
      max = 5;
      break;
    case 'Low':
      min = 6;
      max=10;
      break;
    case 'Medium':
      min = 11;
      max=15;
      break;
    case 'High':
      min = 16;
      max=20;
      break;
    case 'Extreme':
      min = 21;
      max=40;
      break;
    default:
      return res.status(400).json({ message: 'Invalid level parameter' });
  }

  const sql = `SELECT lattitude, longitude FROM sensors WHERE DIST_M BETWEEN ${min} AND ${max} `;
  getbyLvl(sql, res);
});



app.post('/register', (req, res) => {
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
});

const port = process.env.PORT; // You can use environment variables for port configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
var con = require('../models/server.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function generate_otp() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
registrationOTP = async (customer_id, contactNumber, type) => {
  const otp = generating_otp();
  const message = `Your One-Time`;

  const mobileNumber = contactNumber;

  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 5); // Correct expiration time

  const body = {
    apikey: process.env.SP_API_KEY,
    number: mobileNumber,
    message: message,
  };

  try {
    await Otp_Storage.create({
      otp_owner: customer_id,
      otp_code: otp,
      expiration: expirationTime,
      type: type, // Include the type
    });
    const response = await axios.post("https://api.semaphore.co/api/v4/priority", body);
    console.log(response.data);
    if (response.status === 200) {
      return { message: "OTP is successfully sent" };
    } else {
      console.error("Failed to send OTP via Semaphore:", response.data);
      return { message: "Failed to send OTP" };
    }
  } catch (error) {
    console.error("Error sending OTP via Semaphore:", error);
    return { message: "Error sending OTP" };
  }
};

const InsertUser = (req, res) => {
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
}

module.exports ={InsertUser};
var express = require('express');
var app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const userRouter = require('./routes/userRoutes');
app.use(userRouter);
const mapRouter = require('./routes/mapRoutes'); // Import the MapRoute module
app.use(mapRouter);


app.use(cors());
app.use(express.json());

// Example defining a route in Express
app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});

const port = process.env.PORT; // You can use environment variables for port configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
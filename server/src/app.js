//const mqtt = require('mqtt');
var express = require('express');
var app = express();
const cors = require('cors');

require('dotenv').config();
//const mqttClient = require('./controller/mqtt');

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/userRoutes');
app.use(userRouter);
const mapRouter = require('./routes/mapRoutes'); // Import the MapRoute module
app.use(mapRouter);

//mqttClient.init();

// TODO: NOT SURE IF THIS IS SAFE !!!!!!! HOY!!!!! BAGUNAS!!!!!!
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Example defining a route in Express
app.get('/', (req, res) => {
});

const port = process.env.PORT; // You can use environment variables for port configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
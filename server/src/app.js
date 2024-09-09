//const mqtt = require('mqtt');
var express = require('express');
var app = express();
const cors = require('cors');

const path = require('path');
var db = require('./config/dbconnections');
const corsOptions = require('./config/corseOption');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const { logger } = require('./middleware/logEvents');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

require('dotenv').config();
//const mqttClient = require('./controller/mqtt');
app.use(cors());
app.use(express.json());

const userRouter = require('./routes/userRoutes');
app.use(userRouter);
const mapRouter = require('./routes/mapRoutes'); // Import the MapRoute module
app.use(mapRouter);

app.use(logger);
app.use(credentials);

app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/refresh', require('./routes/refresh'));

app.use('/reset', require('./routes/authRes'));
app.use('/auth', require('./routes/auth'));

app.use('/logout', require('./routes/logout'));
// app.post('/logout', (req, res) => {
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//     return res.status(200).json({ message: "Logout successful" });
// });



app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));


app.use('/api/protected-route', verifyJWT, (req, res) => {
    res.json({ message: "You have access to this protected route", user: req.user, roles: req.roles });
});
// Define the reset route before app.use(verifyJWT) if you don't want JWT verification for reset.


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

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
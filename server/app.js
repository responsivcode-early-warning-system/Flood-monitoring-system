const express = require('express');
const app = express();
const path = require('path');
var db = require('./config/dbconnections');
const corsOptions = require('./config/corseOption');
const cors = require('cors');
const bcrypt = require('bcrypt');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const { logger } = require('./middleware/logEvents');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');



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

  



app.listen(7000, ()=>{
    console.log("Listening...");
})
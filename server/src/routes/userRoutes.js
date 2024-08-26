var express = require('express');
const router = express.Router();
const {InsertUser} = require('../controller/user');

router.post('/register',InsertUser)

const UserRoute = router
module.exports = UserRoute;
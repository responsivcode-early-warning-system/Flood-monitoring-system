var express = require('express');
const router = express.Router();
const {InsertUser} = require('../controllers/userRegister');

router.post('/register',InsertUser)

const UserRoute = router
module.exports = UserRoute;
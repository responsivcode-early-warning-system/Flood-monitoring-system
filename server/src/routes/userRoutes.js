var express = require('express');
const router = express.Router();
const {InsertUser} = require('../controllers/user');
const {SendOtp} = require('../controllers/otp')

router.post('/register',InsertUser)
router.post('/sendotp', SendOtp)

const UserRoute = router
module.exports = UserRoute;
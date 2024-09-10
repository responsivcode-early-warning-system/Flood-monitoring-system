var express = require('express');
const router = express.Router();
const {InsertUser} = require('../controllers/user');
const {SendOtp, ValidateOtp} = require('../controllers/otp')

router.post('/register',InsertUser);
router.post('/sendotp', SendOtp);
router.post('/validateotp/:otp', ValidateOtp);

const UserRoute = router
module.exports = UserRoute;
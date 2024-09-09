const express = require('express');
const router = express.Router();
const { resetPassword } = require('../controllers/resetPasswordController'); // Adjust the path as needed

router.post('/', resetPassword);

module.exports = router;

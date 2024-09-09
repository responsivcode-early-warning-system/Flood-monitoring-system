const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for handling login
router.post('/', authController.handleLogin);

module.exports = router;

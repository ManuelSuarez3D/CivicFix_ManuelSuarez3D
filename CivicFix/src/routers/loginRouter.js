const express = require('express');
const router = new express.Router();
const LoginController = require('../controllers/loginController.js');
const {isEmployeeMiddleware} = require("../middleware/auth");

router.get('/login', LoginController.getLogin)
router.post('/login', LoginController.login)
router.get('/logout', isEmployeeMiddleware, LoginController.logout)

module.exports = router;
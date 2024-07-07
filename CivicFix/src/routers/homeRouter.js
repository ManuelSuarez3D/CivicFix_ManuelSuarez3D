const express = require('express');
const router = new express.Router();
const HomeController = require('../controllers/homeController');

router.get('', HomeController.home);

module.exports = router;
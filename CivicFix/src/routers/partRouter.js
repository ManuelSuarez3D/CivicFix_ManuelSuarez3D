const express = require('express');
const router = new express.Router();
const PartController = require('../controllers/partController.js');
const {isCustomerMiddleware} = require("../middleware/auth");

router.get('/parts/:model?/:type?', PartController.getParts);
router.get('/part/:id', PartController.getPartById);
router.post('/part/:id', isCustomerMiddleware, PartController.addPartToCart);

module.exports = router;
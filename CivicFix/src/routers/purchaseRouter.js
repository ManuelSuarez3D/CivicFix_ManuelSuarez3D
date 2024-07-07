const express = require('express');
const router = new express.Router();
const PurchaseController = require('../controllers/purchaseController.js');
const { isCustomerMiddleware } = require('../middleware/auth');

router.post('/purchase', isCustomerMiddleware,  PurchaseController.savePurchase);

module.exports = router;
const express = require('express');
const router = new express.Router();
const CartController = require('../controllers/cartController.js');
const { isCustomerMiddleware } = require('../middleware/auth');

router.get('/cart', isCustomerMiddleware, CartController.getCart);
router.post('/cart/update/:itemId', isCustomerMiddleware, CartController.updateCartItem);
router.post('/cart/delete/:itemId', isCustomerMiddleware, CartController.deleteCartItem);

module.exports = router;
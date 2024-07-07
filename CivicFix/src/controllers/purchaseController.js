const PurchaseService = require("../services/purchaseService");
const cart = require("../services/cartService");
const savePurchase = async (req, res) => {
    const sessionId = req.sessionID;
    const cartItems = await cart.getCart(sessionId);

    try {
        await PurchaseService.savePurchase(sessionId, cartItems);
        res.render('purchase');
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.redirect('/parts');
    }
};

module.exports = {
    savePurchase
}
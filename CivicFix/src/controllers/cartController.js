const cart = require("../services/cartService");

const getCart = async (req, res) => {
    const sessionId = req.sessionID;
    try {
        const cartItems = await cart.getCart(sessionId);
        let totalPrice = 0;

        cartItems.forEach(part => {
            let price = part.price;
            let quantity = part.quantity;

            totalPrice += price * quantity;
        });

        const data = {
            year: new Date().getFullYear(),
            title: `CivicFix - My Cart`,
            cart: cartItems,
            priceTotal: totalPrice
        };

        res.render('cart', data);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.redirect('parts');
    }
};

const updateCartItem = async (req, res) => {
    const itemId = req.params.itemId;
    const newQuantity = req.body.quantity;
    const sessionId = req.sessionID;

    try {
        let cartItems = await cart.getCart(sessionId);

        let itemUpdated = false;
        cartItems.forEach(item => {
            if (item.itemId === itemId) {
                item.quantity = Number(newQuantity);
                itemUpdated = true;
            }
        });

        if (!itemUpdated) {
            console.error(`Item with ID ${itemId} not found in cart`);
            return res.redirect('/parts');
        }

        await cart.updateCart(sessionId, cartItems);

        res.redirect('/cart');
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.redirect('/parts');
    }
};

const deleteCartItem = async (req, res) => {
    const sessionId = req.sessionID;
    const itemId = req.params.itemId;
    try {
        let cartItems = await cart.getCart(sessionId);
       
        cartItems = cartItems.filter(item => item.itemId !== itemId);

        await cart.updateCart(sessionId, cartItems);

        res.redirect('/cart');
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.redirect('/parts');
    }
};

module.exports = {
    getCart,
    updateCartItem,
    deleteCartItem
}
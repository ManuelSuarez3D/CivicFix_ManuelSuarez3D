const fs = require('fs');

const loadCart = (sessionId) => {
    const cartPath = `./fixtures/cart-${sessionId}.json`;

    try {
        const data = fs.readFileSync(cartPath);

        return JSON.parse(data.toString());
    } catch (error) {

        try {
            fs.writeFileSync(cartPath, '[]', 'utf8');

            console.log(`Created new cart file for session ${sessionId}`);
        return [];
        } catch (error) {
            console.error(`Error creating new cart file for session ${sessionId}:`, error);
            return [];
        }
    }
};

const getCart = (sessionId) => {
    const cartItems = loadCart(sessionId);
    const cart = [];

    for(let i = 0; i < cartItems.length; ++i){
        const item = cartItems[i];
        cart.push(item);
    }

    return cart;
}

const updateCart = async (sessionId, cartItems) => {
    const cartPath = `./fixtures/cart-${sessionId}.json`;

    try {
        await fs.promises.writeFile(cartPath, JSON.stringify(cartItems, null, 2));
        console.log('Cart items have been successfully updated.');
    } catch (error) {
        console.error(`Error updating cart items: ${error.message}`);
    }
};

module.exports = {
    getCart,
    updateCart
};
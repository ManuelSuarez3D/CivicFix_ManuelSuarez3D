const fs = require('fs');
const Purchase = require('../models/purchase');

const savePurchase = async (sessionId, purchases) => {
    const cartPath = `./fixtures/cart-${sessionId}.json`;

    try {
        console.log(purchases);
        await Purchase.insertMany(purchases);

        fs.unlink(cartPath, (err) => {
            if (err) {
                console.error(`Error deleting cart file ${cartPath}:`, err);
            } else {
                console.log(`Successfully deleted cart file ${cartPath}`);
            }
        });

    } catch (error) {
        console.error('Error saving purchases:', error);
        return [];
    }
};

module.exports = {
    savePurchase
};
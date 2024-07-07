const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const CART_DIR = path.resolve(__dirname, '../fixtures');

const cleanupExpiredCarts = () => {
    const now = Date.now();

    fs.readdirSync(CART_DIR).forEach(file => {
        if (file.startsWith('cart-') && file.endsWith('.json')) {
            const sessionId = file.replace(/^cart-(.*)\.json$/, '$1');
            const cartPath = path.join(CART_DIR, file);
            const stats = fs.statSync(cartPath);
            const sessionExpirationTime = new Date(stats.mtime).getTime() + (30 * 24 * 60 * 60 * 1000);

            if (sessionExpirationTime <= now) {
                try {
                    fs.unlinkSync(cartPath);
                    console.log(`Deleted cart file for expired session ${sessionId}`);
                } catch (error) {
                    console.error(`Error deleting cart file for session ${sessionId}:`, error);
                }
            }
        }
    });
};

cron.schedule('0 0 * * *', () => {
    console.log('Running daily cleanup task for expired cart files...');
    cleanupExpiredCarts();
});
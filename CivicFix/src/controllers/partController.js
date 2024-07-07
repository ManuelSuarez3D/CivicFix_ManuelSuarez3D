const PartService = require('../services/partService.js');
const mongoose = require('mongoose');
const cart = require("../services/cartService");

const getParts = async (req, res) => {
    const modelFiltered = req.query.model || 'All';
    const typeFiltered = req.query.type || 'All';

    try {
        const inventory = await PartService.getParts();
        let filteredInventory = [];

        if (modelFiltered === 'All' && typeFiltered === 'All') {
            filteredInventory = inventory;
        } else {
            inventory.forEach(part => {
                if (typeFiltered === 'All' || part.type === typeFiltered) {
                    if (modelFiltered === 'All' || part.models.includes(modelFiltered)) {
                        filteredInventory.push(part);
                    }
                }
            });
        }

        const uniqueTypes = [];
        const uniqueModels = [];

        inventory.forEach(part => {
            if (!uniqueTypes.includes(part.type)) {
                uniqueTypes.push(part.type);
            }
            part.models.forEach(model => {
                if (!uniqueModels.includes(model)) {
                    uniqueModels.push(model);
                }
            });
        });

        const data = {
            year: new Date().getFullYear(),
            title: 'CivicFix - Inventory',
            inventory: filteredInventory,
            types: uniqueTypes,
            models: uniqueModels,

        };

        res.render('parts', data);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).send('Error fetching inventory');
    }
};

const getPartById = async (req, res) => {
    const partId = req.params.id;

    try{
        const part = await PartService.getPartById(partId);

        if (!part) {
            return res.redirect('/parts');
        }

        const data = {
            year: new Date().getFullYear(),
            title: `CivicFix - ${part.type}`,
            part: part,
            isLoggedIn: req.session.isLoggedIn ?? false,
            isLoggedOut: !req.session.isLoggedIn
        };

        res.render('part', data);
    } catch (error){
        console.error('Error fetching part by Id:', error);

        res.status(500).send('Error fetching part by Id');
    }

};

const addPartToCart = async (req, res) => {
    const partId = req.params.id;
    const quantity = req.body.quantity;
    const sessionId = req.sessionID;
    try {
        const part = await PartService.getPartById(partId);

        if (!part) {
            return res.redirect('/parts');
        }

        let cartItems = cart.getCart(sessionId);

        let partInCart = false;
        cartItems.forEach(item => {
            if (item.itemId === part.id) {
                item.quantity = Number(item.quantity) + Number(quantity);
                partInCart = true;
            }
        });

        if (!partInCart) {
            cartItems.push({
                customerId: sessionId,
                itemId: part.id,
                name: part.name,
                partNumber: part.partNumber,
                price: part.price,
                quantity: quantity
            });
        }

        await cart.updateCart(sessionId, cartItems);
        res.redirect('/cart');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.redirect('/inventory');
    }
};

module.exports = {
    getParts,
    getPartById,
    addPartToCart
};
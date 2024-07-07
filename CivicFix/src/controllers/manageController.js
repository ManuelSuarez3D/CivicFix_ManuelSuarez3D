const ManageService = require('../services/manageService.js');
const PartService = require("../services/partService");
const Part = require("../models/part");

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
            isLoggedIn: req.session.isLoggedIn ?? false
        };

        res.render('manage', data);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).send('Error fetching inventory');
    }
};

const getPartById = async (req, res) => {
    const partId = req.params.id;
    try {
        const part = await ManageService.getPartById(partId);
        if (!part) {
            return res.status(404).send('Part not found');
        }
        res.status(200).json(part);
    } catch (error) {
        console.error(`Error fetching part with ID ${partId}:`, error);
        res.status(500).send('Error fetching part');
    }
};
const addPart = async (req, res) => {
    const { name, type, price, image, partNumber, models } = req.body;

    if (models === undefined) {
        return res.status(400).send('<div style="color: red;">Please select at least one model.</div>');
    }

    const modelsArray = Array.isArray(models) ? models : [models];

    const compatibility = {};
    let hasValidationErrors = false;

    for (const model of modelsArray) {
        const compatibilityKeys = Object.keys(req.body).filter(key => key.startsWith(`compatibility_${model}_`));
        
        if (!compatibilityKeys.some(key => req.body[key])) {
            hasValidationErrors = true;
            compatibility[model] = [];
            res.status(400).send(`<div style="color: red;">Please select at least one year for model '${model}'.</div>`);
        } else {
            compatibility[model] = compatibilityKeys
                .filter(key => req.body[key])
                .map(key => key.split('_')[2]);
        }
    }

    if (hasValidationErrors) {
        return;
    }

    try {
        const newPart = {
            name,
            type,
            price,
            image,
            partNumber,
            models: modelsArray,
            compatibility
        };

        await ManageService.addPart(newPart);
        res.redirect('/manage');
    } catch (error) {
        console.error('Error adding part:', error);
        res.status(500).send('<div style="color: red;">Error adding part. Please try again later.</div>');
    }
};

const updatePart = async (req, res) => {
    
    const { partId, name, type, price, image, partNumber, models } = req.body;

    if (models === undefined) {
        return res.status(400).send('<div style="color: red;">Please select at least one model.</div>');
    }

    const modelsArray = Array.isArray(models) ? models : [models];

    const compatibility = {};
    let hasValidationErrors = false;

    for (const model of modelsArray) {
        const compatibilityKeys = Object.keys(req.body).filter(key => key.startsWith(`compatibility_${model}_`));
        
        if (!compatibilityKeys.some(key => req.body[key])) {
            hasValidationErrors = true;
            compatibility[model] = [];
            res.status(400).send(`<div style="color: red;">Please select at least one year for model '${model}'.</div>`);
        } else {
            compatibility[model] = compatibilityKeys
                .filter(key => req.body[key])
                .map(key => key.split('_')[2]);
        }
    }

    if (hasValidationErrors) {
        return;
    }

    try {

        const updatedPart = {
            name,
            type,
            price,
            image,
            partNumber,
            models: modelsArray,
            compatibility 
        };

        await ManageService.updatePart(partId, updatedPart);
        res.redirect('/manage');
    } catch (error) {
        console.error('Error updating part:', error);
        res.status(500).send('Error updating part');
    }
};

const deletePart = async (req, res) => {
    const partId = req.params.id;
    try {
        const part = await ManageService.deletePart(partId);
        if (!part) {
            return res.status(404).send('Part not found');
        }

        res.redirect('/manage');
    } catch (error) {
        console.error(`Error deleting part with ID ${partId}:`, error);
        res.status(500).send('Error deleting part');
    }
};

module.exports = {
    getParts,
    getPartById,
    addPart,
    updatePart,
    deletePart
};
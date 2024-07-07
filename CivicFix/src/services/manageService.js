const Part = require('../models/part');

const getParts = async () => {
    try {
        return await Part.find();
    } catch (error) {
        console.error('Error fetching parts:', error);
        throw error;
    }
};

const getPartById = async (id) => {
    try {
        return await Part.findById(id);
    } catch (error) {
        console.error(`Error fetching part with ID ${id}:`, error);
        throw error;
    }
};

const addPart = async (newPart) => {
    try {
        const part = new Part(newPart);
        return await Part.insertMany(part);
    } catch (error) {
        console.error('Error adding part:', error);
        throw error;
    }
};

const updatePart = async (id, updatedPart) => {
    try {
        return await Part.findByIdAndUpdate(id, updatedPart, { new: true });
    } catch (error) {
        console.error(`Error updating part with ID ${id}:`, error);
        throw error;
    }
};

const deletePart = async (partId) => {
    try {
        const part = await Part.findByIdAndDelete(partId);
        return part;
    } catch (error) {
        throw new Error(`Could not delete part with ID ${partId}: ${error.message}`);
    }
};

module.exports = {
    getParts,
    getPartById,
    addPart,
    updatePart,
    deletePart
};

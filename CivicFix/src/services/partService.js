const fs = require('fs');
const Part= require('../models/part');

const partsPath = 'fixtures/parts.json';

/**
 * loadParts Function loads all parts from a file.
 * @returns {Array} All parts from json file.
 */
const loadParts = () => {
    try{
        const data = fs.readFileSync(partsPath);
        return JSON.parse(data.toString());
    }catch (error){
        console.log(error);
        return [];
    }
}

/**
 * getParts Function retrieves all parts from MongoDB.
 * @returns {Array} All parts in inventory.
 */
const getParts = async () => {
    try {
        const parts = await Part.find();
        return parts;
    } catch (error) {
        console.error('Error fetching parts:', error);
        return [];
    }
};

/**
 * getPartById Function retrieves specific part by id from MongoDB.
 * @param {String} id
 * @returns {Object} Specific part matched by id.
 */
const getPartById = async (id) => {
    try {
        const part = await Part.findById(id)

        return part;
    } catch (error) {
        console.error(`Error fetching part with id ${id}:`, error);
        return null;
    }
};


module.exports = {
    getPartById,
    getParts,
    loadParts
}
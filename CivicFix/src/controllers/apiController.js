const Part = require("../models/part");

const getParts = async (req, res) => {
    try {
        const parts = await Part.find();
        res.status(200).json(parts);
    } catch (error) {
        console.error('Error fetching parts:', error);
        res.status(500).json({ error: 'Error fetching parts' });
    }
};

const getPartById = async (req, res) => {
    const { id } = req.params;
    try {
        const part = await Part.findById(id);
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }
        res.status(200).json(part);
    } catch (error) {
        console.error('Error fetching part:', error);
        res.status(500).json({ error: 'Error fetching part' });
    }
};


const addPart = async (req, res) => {
    const { name, type, price, image, partNumber, models, compatibility } = req.body;

    try {
        const newPart = new Part({
            name,
            type,
            price,
            image,
            partNumber,
            models,
            compatibility
        });

        await newPart.save();
        res.status(201).json(newPart);
    } catch (error) {
        console.error('Error adding part:', error);
        res.status(500).json({ error: 'Error adding part' });
    }
};


const updatePart = async (req, res) => {
    const { id } = req.params;
    const { name, type, price, image, partNumber, models, compatibility } = req.body;

    try {
        const updatedPart = await Part.findByIdAndUpdate(id, {
            name,
            type,
            price,
            image,
            partNumber,
            models,
            compatibility
        }, { new: true });

        if (!updatedPart) {
            return res.status(404).json({ error: 'Part not found' });
        }

        res.status(200).json(updatedPart);
    } catch (error) {
        console.error('Error updating part:', error);
        res.status(500).json({ error: 'Error updating part' });
    }
};


const deletePart = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPart = await Part.findByIdAndDelete(id); 

        if (!deletedPart) {
            return res.status(404).json({ error: 'Part not found' });
        }

        res.status(200).json({ message: 'Part deleted successfully' });
    } catch (error) {
        console.error('Error deleting part:', error);
        res.status(500).json({ error: 'Error deleting part' });
    }
};

module.exports = {
    getParts,
    getPartById,
    addPart,
    updatePart,
    deletePart
};
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PartDb = require('../models/part.js');
const PartService = require('../services/partService.js');

dotenv.config({ path: '../config/dev.env' });

let partsData;
try {
    partsData = PartService.loadParts();
} catch (err) {
    console.error('Error loading parts data:', err);
    process.exit(1);
}

if (!process.env.MONGODB) {
    console.error('MONGODB connection string is not defined');
    process.exit(1);
}

console.log(process.env.MONGODB + " is the string");

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        try {
            const docs = await PartDb.insertMany(partsData);
            console.log('Parts inserted successfully:', docs);
        } catch (err) {
            console.error('Error inserting parts:', err);
        } finally {
            mongoose.connection.close();
        }
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

connectToMongoDB();
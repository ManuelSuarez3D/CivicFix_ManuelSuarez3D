const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    partNumber: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    image: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    models: {
        type: [String],
        required: true
    },
    compatibility: {
        type: Map,
        of: [String],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const Part = mongoose.model('part', partSchema);

module.exports = Part;
const mongoose = require('mongoose');
const partNumMinLength = 1;
const partNumMaxLength = 50;

const purchaseSchema = new mongoose.Schema({

customerId: {
    type: String,
    required: true
},

itemId: {
    type: String,
    required: true
},

name: {
    type: String,
        required: true,
        trim: true,
        minlength: [1, 'Name minimum length is 1'],
        maxlength: [100, 'Name maximum length is 100'],
},

partNumber: {
    type: String,
        required: true,
        minlength: [partNumMinLength, `Part number minimum length is ${partNumMinLength}`],
        maxlength: [partNumMaxLength, `Part number maximum length is ${partNumMaxLength}`],
},

price: {
    type: Number,
        required: true,
        min: [1, 'Price minimum value is 1'],
        max: [1000000, 'Price maximum value is 1,000,000'],
},

quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity minimum value is 1'],
    max: [1000000, 'Quantity maximum value is 1,000,000'],
}
});

const Purchase = mongoose.model('purchase', purchaseSchema);

module.exports = Purchase;
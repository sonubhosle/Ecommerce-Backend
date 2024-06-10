const mongoose = require('mongoose');



const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }


})



const Address = mongoose.model('addresses',addressSchema);

module.exports = Address;
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})



const User = mongoose.model('users',userSchema);

module.exports = User;
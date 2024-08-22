const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique:false
    }
})

module.exports = mongoose.model('Employee', employeeSchema);
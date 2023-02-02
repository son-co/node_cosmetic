const mongoose = require("mongoose");

var Customer = new mongoose.Schema({
    hoten: {
        type: String,
        required: true
    },
    ngaysinh: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    diachi: {
        type: String,
        require: true
    },
    matkhau: {
        type: String,
        required: true
    }

})

const customerModel = mongoose.model("customer", Customer);
module.exports = customerModel;
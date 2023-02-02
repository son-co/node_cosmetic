const mongoose = require("mongoose");

var order = new mongoose.Schema({

    idKH: {
        type: String,
        ref: "customerModel"
    },
    tenKH: {
        type: String,
        ref: "customerModel"
    },
    ngaylap: {
        type: String,
        required: true
    },
    trangthai: {
        type: String,
        required: true
    },
    tongtien: {
        type: Number,
        required: true
    }

})

const orderModel = mongoose.model("order", order);
module.exports = orderModel;
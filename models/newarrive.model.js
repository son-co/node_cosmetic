const mongoose = require("mongoose");

var newarrive = new mongoose.Schema({
    tenTH: {
        type: String,
        required: true,
        ref: "brandModel"
    },
    tenSP: {
        type: String,
        required: true,
    },
    hinhanh: {
        type: String,
        required: true
    },
    chitiet: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    gia: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
    }
})

const arriveModel = mongoose.model("newarrive", newarrive);
module.exports = arriveModel;
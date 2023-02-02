const mongoose = require("mongoose");

var rate = new mongoose.Schema({

    idSP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "productModel"
    },
    hinhanh: {
        type: String,
        required: true,
    },
    tenSP: {
        type: String,
        required: true,
    }
})

const rateModel = mongoose.model("rate", rate);
module.exports = rateModel;
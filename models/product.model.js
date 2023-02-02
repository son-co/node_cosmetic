const mongoose = require("mongoose");

var product = new mongoose.Schema({

    tenTH: {
        type: String,
        required: true,
        ref: "brand"
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

const productModel = mongoose.model("product", product);
module.exports = productModel;

// {
//     "idTH": "624d509f829d1fd1a7af772b",
//     "tenSP": "Son INISFREE",
//     "hinhanh":"bestseller-1.png",
//     "chitiet": "Son thỏi mịn môi version Vintage innisfree Edition Smudge Blur Lipstick 0.95g",
//     "rate":"2",
//     "gia": 2200000,
//     "status": "100"
// }
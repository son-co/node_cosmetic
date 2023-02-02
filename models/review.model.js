const mongoose = require("mongoose");

var review = new mongoose.Schema({
    hoten: {
        type: String,
        ref: "customerModel"
    },
    idSP: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "productModel"
    },
    ngayreview: {
        type: String,
        required: true,
    },
    noidung: {
        type: String,
        required: true,
    },
    anhreview: {
        type: String,
    }
})

const reviewModel = mongoose.model("review", review);
module.exports = reviewModel;
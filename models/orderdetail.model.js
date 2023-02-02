const mongoose = require("mongoose");

var orderdetail = new mongoose.Schema({
    tongtien: {
        type: String,
        required: true
    },
    idDH: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true
    },
    month: {
        type: String,
        required: true
    },
    data: [{
        idSP: {
            type: String,
            required: true
        },
        soluong: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        incart: {
            type: String,
            required: true
        }
    }]

})

const orderdetailModel = mongoose.model("orderdetail", orderdetail);
module.exports = orderdetailModel;
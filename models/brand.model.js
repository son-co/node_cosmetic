const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.ObjectId;

var brand = new mongoose.Schema({

    tenTH: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    mota: {
        type: String,
        required: true
    }
})

const brandModel = mongoose.model("brand", brand);
module.exports = brandModel;
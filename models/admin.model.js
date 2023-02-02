const mongoose = require("mongoose");

var admin = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
})

const adminModel = mongoose.model("Admin", admin);
module.exports = adminModel;
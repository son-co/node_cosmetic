const mongoose = require("mongoose");

var pttt = new mongoose.Schema({
    tenPTTT: {
        type: String,
        required: true,
    }
})

const ptttModel = mongoose.model("PTTH", pttt);
module.exports = ptttModel;
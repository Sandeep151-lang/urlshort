const mongoose = require("mongoose");

const url = new mongoose.Schema({
    value: { type: String, required: true }
})

module.exports = mongoose.model('url', url);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Balances = new Schema({
    email: {
        type: String,
        required: "Please insert an email.",
    },
    balance: {
        type: Number,
        required: "Please insert an amount."
    },
}, { timestamps: { updatedAt: true, createdAt: false } });


module.exports = mongoose.model("Balances", Balances);


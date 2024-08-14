const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Transactions = new Schema({
    sender: {
        type: String,
        required: "Please insert an email.",
    },
    reciever: {
        type: String,
        required: "Please insert an email.",
    },
    amount: {
        type: Number,
        required: "Please insert an amount."
    },
}, { timestamps: { updatedAt: false, createdAt: true } });


module.exports = mongoose.model("Transactions", Transactions);
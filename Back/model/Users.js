const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema({
    email: {
        type: String,
        required: "Please insert an email.",
    },
    password: {
        type: String,
        required: "Please insert a password."
    },
    phone: {
        type: String,
        required: "Please insert a phone number."
    },
    verification_code: {
        type: String
    },
    is_activated: {
        type: Boolean
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Users", Users);

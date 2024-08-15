const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
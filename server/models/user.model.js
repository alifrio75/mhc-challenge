const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = Schema({
    company: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['HR', 'Vendor'],
        required: true,
        default: 'HR'
    },
});

mongoose.model("user", User, "user");

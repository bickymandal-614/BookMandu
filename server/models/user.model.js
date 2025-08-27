const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3,"At least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        minlength: [8,"Password must be 8 characters"]
    },
    role: {
        type: String, 
        enum: ["user","admin"],
        default: "user"
    },
    token : {
        type: String,
    },
    orders:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Order"
        }
    ]
},{timestamps: true})
const User = mongoose.model("User", userSchema)
module.exports = User
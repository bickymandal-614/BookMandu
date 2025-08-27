const mongoose = require("mongoose")

const connectDB=async()=>{
    try {
        mongoose.connect(process.env.MONGO_DB)
        console.log("Database connected successfully.");
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB

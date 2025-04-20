const mongoose = require("mongoose");
require("dotenv").config()

const connectDB = () => {
    try{
        const user = mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected")
    }
    catch(error){
        console.log("Error fetching : ",error.message)
    }
}

module.exports = connectDB
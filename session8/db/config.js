const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connection Successfull");
    } catch (error) {
        console.log(`Error Connecting to DB : ${error}`);
    }
}

module.exports = connectDB;
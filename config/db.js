// const MONGO_URI = "mongodb+srv://hacker197:hacker197@cluster0.7ekp0od.mongodb.net/test"
 const MONGO_URI ='mongodb://127.0.0.1:27017/hack'
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`DB connected:${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connectDB
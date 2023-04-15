const MONGO_URI = "mongodb+srv://mzain197197:project27@cluster0.xdx1wtk.mongodb.net/?retryWrites=true&w=majority"
//  const MONGO_URI ='mongodb://127.0.0.1:27017/hack'
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
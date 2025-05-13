import mongoose from "mongoose";

// create mongoDB connection
const mongoDBConnect = async () => {

    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected successfully : ${connection.connection.host}`);;
        
    } catch (error) {
        console.log(`MongoDB connection failed : ${error.message}`);
        
    }

}

export default mongoDBConnect;
import mongoose from "mongoose";
const connectMongoDB = async () => {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        throw new Error ("MONGODB_URL environment variable is not set");
    }
    try {
        await mongoose.connect(mongoUrl)
        console.log("Connected to MongoDB.")
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB
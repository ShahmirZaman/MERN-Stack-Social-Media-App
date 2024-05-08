import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export const dbConnection = async() => {
    try{
        const connectDB = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected!!")
    } catch(error) {
        console.log(error)
    }
}

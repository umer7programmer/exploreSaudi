import mongoose from "mongoose";
import colors from "colors";

const dbConnection=async()=>{
    try {
        const connection= await mongoose.connect(process.env.MONGO_URL);
console.warn(`Database connected to ${connection.connection.host}`.bgMagenta.white)
        
    } catch (error) {
        console.warn(`Error in mongodb ${error}`.bgRed.white);
    }
}
export default dbConnection;
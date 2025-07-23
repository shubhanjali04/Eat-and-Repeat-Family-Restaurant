import mongoose from 'mongoose'
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            serverSelectionTimeoutMS:10000,
        })
        console.log("DB connected")
    } catch (error) {
        console.log("DB error")
        console.error(error.message);
        process.exit(1)
    }
    
    
}
export default connectDb

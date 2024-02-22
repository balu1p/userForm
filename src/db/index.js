import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB);
        console.log(`\n MongoDB connected !! DB HOST: ${connect.connection.host}`);
    } catch (error) {
        console.log("Db is not connected", error)
    }
}

export default connectDB;
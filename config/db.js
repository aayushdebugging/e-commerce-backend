import mongoose from 'mongoose';
import colors from 'colors';

const connectDB =async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connect Successfully ${mongoose.connection.host}`.bgGreen.white);
    }catch(error){
        console.log(`MongoDB failed to Connect ${error}`.bgRed.white)
    }
};

export default connectDB;
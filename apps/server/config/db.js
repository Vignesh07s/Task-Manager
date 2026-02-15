import mongoose from 'mongoose';

const connectToDB = async () => {
    const MONGO_URI = process.env.MONGO_URI
    try {
        const connection = await mongoose.connect(MONGO_URI);

        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDB;
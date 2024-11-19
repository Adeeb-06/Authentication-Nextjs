import mongoose from 'mongoose'

const connectToMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to db')
    } catch (error) {
        console.log('error to connect' , error)
        throw error
    }
}

export default connectToMongoDb;
import mongoose from "mongoose";

export const database_connection = async () => {
    try{
        await mongoose.connect(process.env.GLOBAL_MONGO_URI)
        console.log("DataBase is Connected")
    }catch(error){
        console.log(error.message)
    }
}
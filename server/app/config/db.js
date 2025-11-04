import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const MongoUrl = process.env.MONGO_URI;
const ConnectDB = () => {
  try {
    if(MongoUrl){
        mongoose.connect(MongoUrl)
        console.log("MongoDB connected successfully!")
    }else{
        console.log("Connection error!!! MongoURI is missing");
    }
  } catch (error) {
    console.log(error.message)
  }
};

export default ConnectDB

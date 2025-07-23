import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:false, //<-----not required because auth-service is handeling it.
    },
    address:{
        type:String,
        required:false
    }

},{timestamps:true , minimize:false})

const User = mongoose.model("User",userSchema)

export default User 
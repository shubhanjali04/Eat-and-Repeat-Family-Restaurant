import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    email: {
      type:String,
      required:true,
      unique:true,
    },

    password: {      //only for manual signup
     type:String,
     // Not required for google users because they dont set a password.
    },

    googleId: {    //for google users
        type:String,
        default:null,
    },

    name: {                // required for both google and manual
        type:String,
        required:true,
    },

    role: {             //Role for authorization purposes (default will be 'user')
        type:String,
        enum: ['user','admin'],
        default:'user',
    },

    createdAt:{      //timestamps
        type:Date,
        default:Date.now,
    },


})

const Auth = mongoose.model('Auth', userSchema)
export default Auth
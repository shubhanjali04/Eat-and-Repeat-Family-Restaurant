import mongoose from "mongoose"

const menuSchema = new mongoose.Schema(
 {
  name:{
    type: String,
    required: true,
    trim: true,
  },
 description:{
   type: String,
   default:"", 
  },
 price:{
    type: Number,
    required: true,
  },
 category:{
    type: String,
    required: true,
    enum: ['starter', 'main_course' , 'dessert' , 'beverage' , 'morning breakfast' , 'khichdi special' , 'breads' , 'rice' , 'chicken' , 'snacks']
 },
 image:{
    type: String,
    default: "",
 },

 },
 {
    timestamps:true,
 }
);

const MenuItem = mongoose.model('MenuItem', menuSchema);

export default MenuItem
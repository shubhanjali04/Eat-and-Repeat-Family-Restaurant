import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    menuItemId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    name:String,
    price:Number,
    quantity: {
        type:Number,
        default:1,
    }
});

const cartSchema = new mongoose.Schema({
    userId:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
    },
    items: [itemSchema],
}, {timestamps:true});

const Cart = mongoose.model('cart',cartSchema,'cartItems');

export default Cart
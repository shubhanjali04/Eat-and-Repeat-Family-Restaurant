// order-service > model > orderModel.js

import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // fetched via user-service
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Cart', // fetched via cart-service
    },
    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'MenuItem', // fetched via menu-service
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    deliveryAddress: {
      street: {type:String, required:true},
      city: {type:String, required:true},
      state:{type:String, required:true},
      postalCode: {type:String, required:true},
      country: {type:String, required:true},
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema)

export default Order

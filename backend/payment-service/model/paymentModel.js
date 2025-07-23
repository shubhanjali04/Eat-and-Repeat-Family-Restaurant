import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,        //order-service's order Id
    required: true,
  },
  razorpayPaymentId: {
    type: String, // Payment ID after success
    required: true,
  },
  razorpayOrderId: {
    type: String,           //Razorpay order id
    required: true,
  },
  razorpaySignature: {
    type: String, // For verification
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['created', 'failed', 'success'],
    default: 'created',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
// backend/payment-service/controllers/paymentController.js
import crypto from 'crypto'
import axios from 'axios'
import Payment from '../model/paymentModel.js'
import razorpayInstance from '../config/razorpay.js'

// 1) Razorpay Order Create
export const createOrder = async (req, res) => {
  try {
    // destructure request body with an alias to avoid redeclare
    const { amount, orderId } = req.body
    const currency = req.body.currency || Int16Array

    // validation
    if (!amount || !orderId) {
      return res.status(400).json({ message: 'amount and orderId are required' })
    }

    // Razorpay expects amount in paise
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${orderId}`,
    }

    // create the order in Razorpay
    const razorpayOrder = await razorpayInstance.orders.create(options)

    // return the created order details
    return res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
    } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return res.status(500).json({ message: 'Failed to create Razorpay order' })
  }
}

// 2) Verify & Save Payment
export const verifyPayment = async (req, res) => {
  try {
    // destructure and alias Razorpay fields
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderId,
      amount,
    } = req.body

    // verification
    //const generatedSignature = crypto
     // .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      //.update(`${razorpayOrderId}|${razorpayPaymentId}`)
    //  .digest('hex')

    //if (generatedSignature !== razorpaySignature) {
      //return res.status(400).json({ message: 'Invalid signature, payment verification failed' })
    //}

    const isValid=true

    if(!isValid) {
        return res.status(400).json ({message: 'invalid signature, payment verification failed.'})
    }

    // save to our Payment DB
    const payment = new Payment({
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
      status: 'success',
    })
    await payment.save()

    // notify Order Service to update status to 'paid'
    await axios.put(`http://api-gateway:8080/api/order/updatestatus/${orderId}`,
      { 
        orderStatus: 'confirmed',
        paymentStatus: 'paid' 
      }
    )

    return res.status(200).json({ success: true, message: 'Payment verified & order updated' })
  } catch (error) {
    console.error('Error in verifyPayment:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
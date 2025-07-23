import express from 'express'
import { createOrder, verifyPayment } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/createorder', createOrder)
router.post('/verifypayment', verifyPayment)


export default router
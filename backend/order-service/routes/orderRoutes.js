import express from 'express'
import { placeOrder, cancelOrder, updateOrderStatus } from '../controllers/orderController.js'

const router = express.Router()

router.post('/placeorder', placeOrder)   // place new order

router.put('/cancel/:orderId', cancelOrder)

router.put('/updatestatus/:orderId', updateOrderStatus)


export default router

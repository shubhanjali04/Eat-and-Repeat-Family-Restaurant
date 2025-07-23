import express from 'express'
import {
  assignDelivery,
  completeDelivery,
  getAllDeliveries,
} from '../controller/deliveryController.js'

const router = express.Router()

// @route   POST /delivery/assign
// @desc    Assign a delivery agent to an order
router.post('/assign', assignDelivery)

// @route   PUT /delivery/complete/:id
// @desc    Mark delivery as completed and update order status via API Gateway
router.put('/complete/:id', completeDelivery);

// @route   GET /delivery/all
// @desc    Get all delivery records (for admin/internal use)
router.get('/all', getAllDeliveries)

export default router
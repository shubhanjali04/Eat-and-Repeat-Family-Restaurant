import Delivery from '../models/deliveryModel.js'
import axios from 'axios'

/**
 * Assign a delivery agent to an order
 * POST /delivery/assign
 */
export const assignDelivery = async (req, res) => {
  try {
    const { orderId, deliveryPerson } = req.body

    if (!orderId || !deliveryPerson) {
      return res.status(400).json({ message: 'Order ID and Delivery Agent Name are required' })
    }

    const newDelivery = await Delivery.create({
      orderId,
      deliveryPerson,
      status: 'Assigned',
    });

    res.status(201).json({
      success: true,
      message: 'Delivery assigned successfully',
      data: newDelivery,
    });
  } catch (error) {
    console.error('Error assigning delivery:', error.message);
    res.status(500).json({ success: false, message: 'Failed to assign delivery', error: error.message })
  }
}

/**
 * Mark delivery as completed and update order status to "Delivered"
 * PUT /delivery/complete/:id
 */
export const completeDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Update delivery status to "Delivered"
    const delivery = await Delivery.findByIdAndUpdate(
      id,
      { status: 'Delivered' },
      { new: true }
    );

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery record not found' })
    }

    const { orderId } = delivery;

    // Step 2: Call Order Service via API Gateway to update order status
    await axios.put(`http://localhost:8080/order/updatestatus/${orderId}`, {
      orderStatus: 'Delivered',
    });

    res.status(200).json({
      success: true,
      message: 'Delivery completed and order status updated successfully',
      data: delivery,
    });
  } catch (error) {
    console.error('Error completing delivery:', error.message);
    res.status(500).json({ success: false, message: 'Failed to complete delivery', error: error.message })
  }
};

/**
 * Get all deliveries (for admin or internal use)
 * GET /delivery/all
 */
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: deliveries })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch deliveries', error: error.message })
  }
}
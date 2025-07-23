import mongoose from 'mongoose'
import Order from '../model/orderModel.js'
import axios from 'axios'

// place a new Order

export const placeOrder = async (req,res) => {
    try {
        const { userId, cartId, items, deliveryAddress } = req.body
        const newOrder = new Order({userId, cartId, items, deliveryAddress})

        // validate delivery address
        if(
            !deliveryAddress || 
            !deliveryAddress.street || 
            !deliveryAddress.city || 
            !deliveryAddress.state ||
            !deliveryAddress.postalCode ||
            !deliveryAddress.country
        )   {
            return res.status(400).json({message:"Delivery address is required with all fields."})
            }

        // Validate and calculate total price
        let totalPrice = 0
        const updatedItems = []

        for (const item of items) {
            const {menuItemId, quantity} = item

            const menuRes = await axios.get(`http://api-gateway:8080/api/menu/${menuItemId}`)

            const menuItem = menuRes.data

            if(!menuItem || !menuItem.price) {
                res.status(400).json({message:`Menu item not found:${menuItemId}`})
            }

            const price = menuItem.price
            const itemTotal = price * quantity
            totalPrice += itemTotal

            updatedItems.push({
                menuItemId,
                quantity,
                price,
            })
        }

        // Create the order
        const order = new Order({
            userId, cartId, items:updatedItems, totalPrice, deliveryAddress
        })
        

        await order.save()

        res.status(201).json({success:true,
            message:"Order placed successfully",
            order
        })
    } catch (error) {
        console.error("Error placing order:",error.message)
        res.status(500).json({success:false,message:"failed to place order."})
    }
}

// Cancelling Order
export const cancelOrder = async (req,res) =>{
    try {
        const {orderId} = req.params

        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({message:"Order not found."})
        }


        if(order.status==="cancelled") {
            return res.status(404).json({message:"Order already cancelled."})
        }

        order.status = "cancelled"
        await order.save()

        res.status(200).json({message:"Order cancelled successfully", order})
    } catch (error) {
        console.error("Error cancelling order:",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}



// Updating order status

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { orderStatus, paymentStatus } = req.body

    if (!orderStatus && !paymentStatus) {
      return res.status(400).json({ message: 'Atleast oe field Order Status/payment Status is required' })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if(orderStatus) order.orderStatus = orderStatus
    if(paymentStatus) order.paymentStatus = paymentStatus
    
    await order.save()

    res.status(200).json({ message: 'Order status updated successfully', order })
  } catch (error) {
    console.error('Error updating order status:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


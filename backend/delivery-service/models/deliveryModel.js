import mongoose from "mongoose"

/**
 * Delivery Schema
 * Stores delivery assignment and tracking info for each order
 */
const deliverySchema = new mongoose.Schema(
  {
    // Unique order ID (should come from order-service)
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    // Name or ID of the delivery person
    deliveryPerson: {
      type: String,
      required: true,
    },

    // Current delivery status
    status: {
      type: String,
      enum: ["Pending", "Assigned", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // Estimated delivery time (set by admin or system)
    estimatedDeliveryTime: {
      type: Date,
    },

    // Timestamp when the order was actually delivered
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Delivery model
const Delivery = mongoose.model("Delivery", deliverySchema)
export default Delivery
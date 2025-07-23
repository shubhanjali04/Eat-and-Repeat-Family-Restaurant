// //This File handles CRUD operations for Cart items.
import axios from 'axios'
import mongoose from 'mongoose'
import Cart from '../model/cartModel.js'


export const addToCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items)) {
      return res.status(400).json({ message: 'userId and items are required' })
    }

    // Step 1: Filter and validate input items
    const cleanedItems = items.filter(
      (item) => item && item.menuItemId && typeof item.quantity === 'number'
    )

    if (cleanedItems.length === 0) {
      return res.status(400).json({ message: 'Each item needs valid menuItemId and quantity' })
    }

    console.log("Received cleaned items:", cleanedItems)

    // Step 2: Fetch data from menu-service
    const updatedItems = await Promise.all(
      cleanedItems.map(async (item) => {
        try {
          const res = await axios.get(`http://api-gateway:8080/api/menu/${item.menuItemId}`)

          const menuData = res.data;

          return {
            ...item,
            name: menuData.name,
            price: menuData.price,
          }
        } catch (err) {
          console.error(`Failed to fetch menu item ${item.menuItemId}:`, err?.response?.data || err.message)
          return null;
        }
      })
    );

    // Step 3: Remove failed/null entries
    const finalItems = updatedItems.filter(Boolean)

    if (finalItems.length === 0) {
      return res.status(400).json({ message: 'All menu items failed to fetch' })
    }

    // Step 4: Save cart in DB (optional logic below)
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: finalItems } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Cart updated successfully', cart })

  } catch (err) {
    console.error('Add to cart error:', err.message)
    res.status(500).json({ error: 'Failed to add item to cart', message: err.message })
  }
};
// Get cart by user Id
export const getCartByUserId = async (req,res) => {
 const {userId} = req.params
 try {
    const cart = await Cart.findOne({userId})
    if(!cart) {
        return res.status(404).json ({message: "Cart not found"})
    }

    res.status(200).json({message:"cart fetched successfully",cart})
 } catch (error) {
    res.status(500).json({ error: "Erorr fetching cart", message: error.message})
 }
}

// Update cart Item in cart

export const updateCartItem = async (req,res) => {
    const { userId, menuItemId, quantity} = req.body
    try {
        const cart = await Cart.findOne({ userId })

        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        const item = cart.items.find((i) => i.menuItemId === menuItemId)
        
        if(!item) {
            return res.status(404).json({message:"item not found in cart"})
        }
        item.quantity = quantity
        await cart.save()

        res.status(200).json({message:"Cart item updated successfully",cart})
        
    } catch (error) {
        res.status(500).json({ error: "Failed to update item", message: error.message})
 }
}
    


// remove an item from cart
export const removeItemFromCart = async (req,res) => {
    const { userId, menuItemId } = req.body
    try {
        const cart = await Cart.findOne({userId})
        if(!cart) {
        return res.status(404).json ({message: "Cart not found"})
    }
    cart.items = cart.items.filter((item) => item.itemId !== menuItemId)
    await cart.save()
    res.status(200).json({message:"Item removed from cart successfully",cart})
    } catch (error) {
        res.status(500).json({ error: "Erorr removing item", message: error.message})
    }
}

// Clear all items from cart
export const clearCart = async (req,res) => {
 const { userId } = req.params

 try {
    const cart = await Cart.findOne({userId})

    if(!cart){
        return res.status(404).json ({message: "Cart not found"})
    }
    cart.items = []
    await cart.save()

    res.status(200).json({message:"Cart cleared",cart})
 } catch (error) {
    res.status(500).json({error: "Error clearing cart", message:error.message})
 }

}

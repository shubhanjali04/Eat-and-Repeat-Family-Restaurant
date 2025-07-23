import express from 'express'
import{
    addToCart,
    getCartByUserId,
    updateCartItem,
    removeItemFromCart,
    clearCart
} from '../controllers/cartController.js'

const router = express.Router()

router.post('/cart/add', addToCart)

router.get('/cart/:userId', getCartByUserId)

router.put('/cart/update/:userId/:itemId', updateCartItem)

router.delete('/cart/remove/:userId/:itemId', removeItemFromCart )

router.delete('cart/clear/:userId', clearCart)

export default router
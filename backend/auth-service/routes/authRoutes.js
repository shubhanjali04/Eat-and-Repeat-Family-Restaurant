import express from 'express'
import {registerUser, loginUser, logoutUser} from '../controllers/authController.js'
import { firebaseLogin} from '../controllers/firebaseAuthController.js'

const router = express.Router()


// normal register route
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
//Firebase login route
router.post("/firebase-login", firebaseLogin)

export default router

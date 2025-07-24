import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Auth from '../model/authModel.js'
import axios from 'axios'
import dotenv from 'dotenv'
import { hashpassword } from '../utils/hashPassword.js'
dotenv.config()

//register controller
export const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body

        //check if user already exists
        const existingUser = await Auth.findOne({ email })
        if(existingUser){
            return res.status(400).json({message: 'User already exists'})
        }


        const hashedPassword = await hashpassword(password, 8)

        const newUser = await Auth.create({
            name,
            email,
            password:hashedPassword,
        })

        console.log("User saved in auth-db:", newUser)

        // Send user data to user-service
        try {
            const response = await
             axios.post(`${process.env.USER_SERVICE_URL}/create`,{
            name,
            email,
             })
             console.log("User added to user_db:",response.data)
         }catch (error) {
            console.error("Error saving to user-service:",error.response?.data || error.message)
        }
        
        

        //generate jwt token
        const token = jwt.sign(
            {userId: newUser._id, email: newUser.email},
            process.env.JWT_SECRET,
             {expiresIn:'7d'}
        )

        res.status(201).json({message:'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name:newUser.name,
                email:newUser.email,
            }
        })

    } catch (error) {
       console.error('registration error:', error.message)
       res.status(500).json({message:'Internal server error'})
    }
}

//Login Controller
export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body

        //check if user exists
        const user = await Auth.findOne({email})
        if(!user) return res.status(404).json({message:'user not found'})

        //check password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:'invalid credentials'})
        

       // generate jwt token
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )
          res.status(200).json({message:'login successful',
            token,
             user:{
                id:user._id,
                name:user.name,
                email:user.email
             }
            })
        
     } catch (error) {
        res.status(500).json({message:'Server error',error:error.message})
    }
}

// Logout controller
export const logoutUser = (req,res) => {
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV == 'production',
            sameSite:'strict'
        })
        res.status(200).json({message:'Logged out Successfully'})
    } catch (error) {
        res.status(500).json({message:'Server error',error:error.message})
    }
}
    


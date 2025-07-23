import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import mongoose from 'mongoose'
dotenv.config()

console.log("PORT from .env:",process.env.port)

let port = process.env.PORT || 6000


let app = express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:8000",
    credentials:true
}))

app.use("/",userRoutes)

app.listen(port,()=>{
    console.log("Hi, Hello from user-service server")
    connectDb()
})


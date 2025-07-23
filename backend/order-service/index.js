import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()


let port=process.env.PORT || 6004

let app = express()
app.use(express.json())

app.use('/', orderRoutes)




app.listen(port,()=>{
    console.log("Hello from order-service server")
    connectDb()
})
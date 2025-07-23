import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import deliveryRoutes from './routes/deliveryRoutes.js'


dotenv.config()


let port=process.env.PORT || 6006

let app = express()
app.use(express.json())

app.use('/', deliveryRoutes)






app.listen(port,()=>{
    console.log("Hello from delivery-service server")
    connectDb()
})
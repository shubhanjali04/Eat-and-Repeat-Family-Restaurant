import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDb from './config/db.js'
import paymentRoutes from './routes/paymentRoutes.js'


dotenv.config()

let app = express()
let PORT = process.env.PORT || 6005


app.use(express.json())

app.use('/', paymentRoutes)

app.get('/', (req,res) => {
    res.send("Hello from payment-service server")
})


app.listen(PORT,() =>{
    console.log(`payment-service server is runnning on port ${PORT}`)
    connectDb()
})


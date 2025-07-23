import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()


let port = process.env.PORT || 6003


let app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/',authRoutes)

app.get('/', (req,res)=> {
    res.send("Hello from auth-service server")
})



app.listen(port,()=>{
    console.log("Hello from auth-service server")
    connectDb()
})
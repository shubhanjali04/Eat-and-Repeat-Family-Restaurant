import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import path from "path"
import menuRoutes from './routes/menuRoutes.js'

dotenv.config()
console.log("Loaded ENV:",process.env.MONGODB_URL)

let port = process.env.PORT || 6001

let app = express()
app.use(express.json())

app.use('/uploads',express.static(path.join('uploads')))

app.use("/", menuRoutes)

const startServer = async () =>{
    try{
        await connectDb()
        app.listen(port, '0.0.0.0',()=>{
  console.log("Hi hello from menu server")
    })
} catch (error) {
  console.error("Failed to start server:",error.message)
}
}

startServer()



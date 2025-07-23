import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cartRoutes from './routes/cartRoutes.js'
dotenv.config()

let port= process.env.PORT || 6002;


let app = express()

app.use(express.json())
app.use('/',cartRoutes)

app.get('/', (req,res) => {
    res.send("Hello from cart-service server")
})


app.listen(port,() =>{
    console.log(`cart-service server is runnning on port ${port}`)
    connectDb()
}

)
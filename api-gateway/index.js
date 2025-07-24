import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { createProxyMiddleware } from "http-proxy-middleware"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 6080

// Middleware
app.use(cors());
app.use(morgan("dev"));

app.use('/test', express.json(), (req, res) => {
  res.json({ msg: "Test successful", body: req.body })
})

// Proxy Routes
app.use("/api/user", createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/user": "",
  },
     onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body)
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.write(bodyData)
    }
  }
}))

app.use("/api/menu", createProxyMiddleware({
  target:process.env.MENU_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
  "^/api/menu": "",
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body)
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.write(bodyData)
    }
  }
}
}))

app.use("/api/cart", createProxyMiddleware({
  target: process.env.CART_SERVICE_URL,
  changeOrigin: true,
   pathRewrite: {
      '^/api/cart': '', 
    }
}))

app.use("/api/auth", createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": ""
  }
}))

app.use("/api/order", createProxyMiddleware({
  target:process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
   pathRewrite: {
    '^/api/order': '',  
  },
}))

app.use("/api/payments", createProxyMiddleware({
  target:process.env.PAYMENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/payments': '',
    onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body)
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.write(bodyData)
    }
  }
  },  
}))


app.use("/api/delivery", createProxyMiddleware({
  target:process.env.DELIVERY_SERVICE_URL,
  changeOrigin: true,
   pathRewrite: {
    '^/api/delivery': '',  
  },
}))

app.get('/', (req,res) => {
    res.send("Hello from api-gateway server")
})


app.listen(PORT,() =>{
    console.log(`api-gateway server is runnning on port ${PORT}`)
}

)
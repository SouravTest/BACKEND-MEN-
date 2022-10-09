const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

var cors = require('cors')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).json({message : '......WELCOME....'})
})

app.get('/api/v1',(req,res)=>{
    res.status(200).json({message : 'API SERVER RUNNING (v1)....'})
})

app.use('/api/v1/superadmin',require('./routes/superAdminRoutes'))

app.use('/api/v1/category',require('./routes/categoryRoutes'))
app.use('/api/v1/subcategory',require('./routes/subcategoryRoutes'))
app.use('/api/v1/brand',require('./routes/brandRoutes'))
app.use('/api/v1/product',require('./routes/productRoutes'))

app.use('/api/v1/customer',require('./routes/customerRoutes'))

app.use('/api/v1/cart',require('./routes/cartRoutes'))
app.use('/api/v1/wishlist',require('./routes/wishlistRoutes'))

app.use('/api/v1/order',require('./routes/orderRoutes'))

app.use(errorHandler)

app.listen(port,()=>console.log(`server started at port : ${port}`))
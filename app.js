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

// app.get('/api/test',(req,res)=>{
//     res.status(200).json({message : 'TEST SERVER RUNNING'})
// })

app.use('/api/v1/superadmin',require('./routes/superAdminRoutes'))

app.use('/api/v1/category',require('./routes/categoryRoutes'))
app.use('/api/v1/subcategory',require('./routes/subcategoryRoutes'))
app.use('/api/v1/brand',require('./routes/brandRoutes'))

app.use(errorHandler)

app.listen(port,()=>console.log(`server started at port : ${port}`))
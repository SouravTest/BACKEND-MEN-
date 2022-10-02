const express = require('express')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.get('/api/test',(req,res)=>{
//     res.status(200).json({message : 'TEST SERVER RUNNING'})
// })

app.use('/api/v1/category',require('./routes/categoryRoutes'))

app.listen(port,()=>console.log(`server started at port : ${port}`))
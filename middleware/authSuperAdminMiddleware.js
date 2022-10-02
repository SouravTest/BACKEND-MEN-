const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Superadmin = require('../models/superAdminModel')

const SuperAdminProtect = asyncHandler(async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            //verify jwt
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            //GET USER FROM TOKEN
            req.user = await Superadmin.findById(decode.id).select('-password')
            next()

        } catch (error) {
            // console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized , token not found')
    }
} )

module.exports = {SuperAdminProtect}
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Superadmin = require('../models/superAdminModel')




//@desc      Get super admin details
//@route     GET   api/v1/superadmin/me
//@access    PRIVATE
const getSuperAdminDetails = asyncHandler(async (req, res) => {
    const superadmin = await Superadmin.findById(req.user._id, ['_id', 'name', 'email'])
    if (!superadmin) {
        res.status(400)
        throw new Error('Super admin Not found')
    }
    res.status(200).json(superadmin);
})



//@desc      Add super admin
//@route     POST   api/v1/superadmin/register
//@access    Public
//@time limit : Just ONCE
const addSuperAdmin = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    // if(!name || !email || !password){
    //     res.status(400)
    //    throw new Error('Enter all fields')
    // }

    if (!req.body.name) {
        res.status(400)
        throw new Error('Enter name')
    }
    if (!req.body.email) {
        res.status(400)
        throw new Error('Enter email')
    }
    if (!req.body.password) {
        res.status(400)
        throw new Error('Enter password')
    }

    //checking total number of Super Admin
    const no = await Superadmin.count()
    if (no > 0) {
        res.status(400)
        throw new Error('Allready Super admin available . total:' + no)
    }

    //checking if available email

    const superAdminExists = await Superadmin.findOne({ email })
    if (superAdminExists) {
        res.status(400)
        throw new Error('Email alredy exists')
    }


    //Hash password

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const superadmin = await Superadmin.create({
        name,
        email,
        password: hashedPassword
    })

    if (superadmin) {
        res.status(201).json({
            _id: superadmin.id,
            name: superadmin.name,
            email: superadmin.email,
            token: generateToken(superadmin.id)
        })
    } else {
        res.status(400)
        throw new Error('Unable to register')
    }
})



//@desc      Login super admin
//@route     POST   api/v1/superadmin/login/:id
//@access    PUBLIC
const loginSuperAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Enter email & password')
    }

    //checking email
    const superadmin = await Superadmin.findOne({ email })
    if (superadmin) {
        if (await bcrypt.compare(password, superadmin.password)) {
            res.status(201).json({
                _id: superadmin.id,
                name: superadmin.name,
                email: superadmin.email,
                token: generateToken(superadmin.id)
            })
        } else {
            res.status(400)
            throw new Error('Wrong Email or password')
        }
    } else {
        res.status(400)
        throw new Error('Wrong Email or password ..')
    }


})



//@desc      update super admin
//@route     PUT   api/v1/superadmin/update
//@access    Private
const updateSuperAdmin = asyncHandler(async (req, res) => {

    if (!req.body.email) {
        res.status(400)
        throw new Error('Enter updated email')
    }

    if (!req.body.name) {
        res.status(400)
        throw new Error('Enter updated name')
    }



    const superadmin = await Superadmin.findById(req.user._id)
    if (!superadmin) {
        res.status(400)
        throw new Error('superadmin Not found')
    }

    const updatesuperadmin = await Superadmin.findByIdAndUpdate(req.user._id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'superadmin update :' + updatesuperadmin });
})



//--- GENERAT TOKEN (JWT) ---//
const generateToken = (id) => {
    return jwt.sign({ sudo_id: id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}



module.exports = {
    getSuperAdminDetails, addSuperAdmin, loginSuperAdmin, updateSuperAdmin
}



// Bearer Authentication
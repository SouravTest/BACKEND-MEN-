const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Superadmin = require('../models/superAdminModel')




//@desc      Get super admin details
//@route     GET   api/v1/superadmin/get/:id
//@access    Public
const getSuperAdminDetails = asyncHandler(async (req, res) => {
    const superadmin = await Superadmin.findById(req.params.id)
    if (!superadmin) {
        res.status(400)
        throw new Error('Super admin Not found')
    }
    res.status(200).json(superadmin);
})



//@desc      Add super admin
//@route     GET   api/v1/superadmin/register
//@access    Private
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
        })
    } else {
        res.status(400)
        throw new Error('Unable to register')
    }
})



//@desc      Login super admin
//@route     GET   api/v1/superadmin/delete/:id
//@access    Private
const loginSuperAdmin = asyncHandler(async (req, res) => {

    const {email,password} = req.body
      if( !email || !password){
        res.status(400)
       throw new Error('Enter email & password')
    }

    //checking email
    const superAdmin = await Superadmin.findOne({ email })
    if (superAdmin) {
        if(await bcrypt.compare(password,superAdmin.password)){
            res.status(201).json({
                _id: superAdmin.id,
                name: superAdmin.name,
                email: superAdmin.email,
            })
        }else{
            res.status(400)
        throw new Error('Wrong Email or password')
        }
    }else{
        res.status(400)
        throw new Error('Wrong Email or password ..')
    }

   
})



//@desc      update super admin
//@route     GET   api/v1/superadmin/update/:id
//@access    Private
const updateSuperAdmin = asyncHandler(async (req, res) => {

    if (!req.body.category_name) {
        res.status(400)
        throw new Error('Enter updated category name')
    }


    const category = await Category.findById(req.params.id)
    if (!category) {
        res.status(400)
        throw new Error('Category Not found')
    }

    const updatecategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'catagory update :' + updatecategory });
})







module.exports = {
    getSuperAdminDetails, addSuperAdmin, loginSuperAdmin, updateSuperAdmin
}
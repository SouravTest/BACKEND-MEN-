const express = require('express')
const router = express.Router()
const {SuperAdminProtect} = require('../middleware/authSuperAdminMiddleware')
const {getAllBrand, getSpecificBrand, addBrand, updateBrand, deleteBrand} = require('../controller/brandController')

router.get('/getall',getAllBrand)

router.get('/get/:id',getSpecificBrand)

router.post('/add',SuperAdminProtect,addBrand);

router.put('/update/:id',SuperAdminProtect,updateBrand);


router.delete('/delete/:id',SuperAdminProtect,deleteBrand)


module.exports = router
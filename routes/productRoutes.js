const express = require('express')
const router = express.Router()
const {SuperAdminProtect} = require('../middleware/authSuperAdminMiddleware')
const {getAllProduct, getSpecificProduct, addProduct, updateProduct, deleteProduct} = require('../controller/productController')

router.get('/getall',getAllProduct)

router.get('/get/:id',getSpecificProduct)

router.post('/add',SuperAdminProtect,addProduct);

router.put('/update/:id',SuperAdminProtect,updateProduct);


router.delete('/delete/:id',SuperAdminProtect,deleteProduct)


module.exports = router
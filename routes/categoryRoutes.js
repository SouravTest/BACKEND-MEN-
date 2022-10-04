const express = require('express')
const router = express.Router()
const { getAllCategory, getSpecificCategory, addCategory, updateCategory, deleteCategory } = require('../controller/categoryController')

const { SuperAdminProtect } = require('../middleware/authSuperAdminMiddleware')

router.get('/getall', getAllCategory)

router.get('/get/:id', getSpecificCategory)

router.post('/add', SuperAdminProtect, addCategory);

router.put('/update/:id', SuperAdminProtect, updateCategory);


router.delete('/delete/:id', SuperAdminProtect, deleteCategory)


module.exports = router
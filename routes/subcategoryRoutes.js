const express = require('express')
const router = express.Router()
const { getAllSubcategory, getSpecificSubcategory, addSubcategory, updateSubategory, deleteSubcategory } = require('../controller/subcategoryController')

const { SuperAdminProtect } = require('../middleware/authSuperAdminMiddleware')

router.get('/getall', getAllSubcategory)

router.get('/get/:id', getSpecificSubcategory)

router.post('/add', SuperAdminProtect, addSubcategory);

router.put('/update/:id', SuperAdminProtect, updateSubategory);

router.delete('/delete/:id', SuperAdminProtect, deleteSubcategory)


module.exports = router
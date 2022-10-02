const express = require('express')
const router = express.Router()
const { getAllSubcategory,getSpecificSubcategory,addSubcategory,updateSubategory,deleteSubcategory} = require('../controller/subcategoryController')

router.get('/getall',getAllSubcategory)

router.get('/get/:id',getSpecificSubcategory)

router.post('/add',addSubcategory);

router.put('/update/:id',updateSubategory);

 router.delete('/delete/:id',deleteSubcategory)


module.exports = router
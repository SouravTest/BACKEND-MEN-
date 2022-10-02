const express = require('express')
const router = express.Router()
const { getAllCategory,getSpecificCategory,addCategory,updateCategory,deleteCategory} = require('../controller/categoryController')

router.get('/getall',getAllCategory)

router.get('/get/:id',getSpecificCategory)

router.post('/add',addCategory);

router.put('/update/:id',updateCategory);


router.delete('/delete/:id',deleteCategory)


module.exports = router
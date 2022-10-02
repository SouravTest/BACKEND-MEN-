const express = require('express')
const router = express.Router()
const {SuperAdminProtect} = require('../middleware/authSuperAdminMiddleware')

const {getSuperAdminDetails, addSuperAdmin, loginSuperAdmin, updateSuperAdmin } = require('../controller/superAdminController')

router.post('/register',addSuperAdmin)

router.post('/login',loginSuperAdmin);

router.get('/get/:id',SuperAdminProtect, getSuperAdminDetails)

router.put('/update/:id',updateSuperAdmin);


module.exports = router
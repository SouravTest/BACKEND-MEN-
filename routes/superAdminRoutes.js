const express = require('express')
const router = express.Router()
const { SuperAdminProtect } = require('../middleware/authSuperAdminMiddleware')

const { getSuperAdminDetails, addSuperAdmin, loginSuperAdmin, updateSuperAdmin } = require('../controller/superAdminController')

router.post('/register', addSuperAdmin)

router.post('/login', loginSuperAdmin);

router.get('/me', SuperAdminProtect, getSuperAdminDetails)

router.put('/update', SuperAdminProtect, updateSuperAdmin);


module.exports = router
const express = require('express')
const { getUser, getAllUsers } = require('../Controller/userController')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../Middlewares/authentication')

router.route('/get-user').post(authenticateUser, getUser)
router
    .route('/get-all_users')
    .get(authenticateUser, authorizePermissions('admin'), getAllUsers)

module.exports = router

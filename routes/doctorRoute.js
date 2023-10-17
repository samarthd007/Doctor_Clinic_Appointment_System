const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../Middlewares/authentication')
const {
    getAllDoctorDetails,
    createDoctorDetails,
    getDoctorById,
} = require('../Controller/doctorController')

router.route('/get-all-doctors').get(authenticateUser, getAllDoctorDetails)

router.route('/get-doctorId').post(authenticateUser, getDoctorById)

router
    .route('/create-doctor-details')
    .post(authenticateUser, authorizePermissions('admin'), createDoctorDetails)

module.exports = router

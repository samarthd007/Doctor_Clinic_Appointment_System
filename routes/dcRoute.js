const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../Middlewares/authentication')
const {
    getAllClinicsDoctors,
    createDoctorClinic,
    getAllClinicByDoctorID,
    getAllDoctorByClinicID,
    getTimings,
    checkAvilability,
    updateDC,
} = require('../Controller/dcSchemaController')

router.route('/get-all-dc').get(authenticateUser, getAllClinicsDoctors)

router
    .route('/create-dc')
    .post(authenticateUser, authorizePermissions('admin'), createDoctorClinic)

router.route('/get-clinics-dc').post(
    authenticateUser,

    getAllClinicByDoctorID
)

router.route('/get-doctors-dc').post(
    authenticateUser,

    getAllDoctorByClinicID
)

router.route('/get-timings').post(authenticateUser, getTimings)

router.route('/check-availability').post(authenticateUser, checkAvilability)

router
    .route('/update')
    .post(authenticateUser, authorizePermissions('admin'), updateDC)

module.exports = router

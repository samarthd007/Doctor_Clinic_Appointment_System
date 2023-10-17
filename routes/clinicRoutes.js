const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../Middlewares/authentication')
const {
    getAllClinics,
    createClinic,

    getClinicById,
} = require('../Controller/clinicController')

router.route('/get-all-clinic').get(authenticateUser, getAllClinics)

router
    .route('/create-clinic')
    .post(authenticateUser, authorizePermissions('admin'), createClinic)

router.route('/get-clinic-id').post(authenticateUser, getClinicById)

module.exports = router

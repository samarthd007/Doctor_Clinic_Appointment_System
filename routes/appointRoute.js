const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../Middlewares/authentication')
const {
    takeAppointment,
    getAllAppointments,
    cancelAppointment,
} = require('../Controller/appointmentController')

router.route('/take-appointment').post(authenticateUser, takeAppointment)

router.route('/get-all-appointment').get(authenticateUser, getAllAppointments)

router.route('/cancel').post(authenticateUser, cancelAppointment)

module.exports = router

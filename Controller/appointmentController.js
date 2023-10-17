const { StatusCodes } = require('http-status-codes')
const CustomError = require('../Errors')
const Appointment = require('../models/Appointment')
const User = require('../models/User')
const DoctorClinic = require('../models/DoctorClinicSchema')

const takeAppointment = async (req, res) => {
    let { doctorId, clinicId, timings, appday } = req.body

    appday = Number(appday)

    const { userId, name } = req.user
    const user = await User.findOne({ _id: userId })
    const email = user.email

    // const ifExist = await Appointment.findOne({ userId, doctorId, clinicId })

    // if (ifExist) {
    //     throw new CustomError.BadRequestError(
    //         'You have already taken an appointment with the doctor and this clinic.Try with different clinic'
    //     )
    // }

    let dc = await DoctorClinic.findOne({ clinicId, doctorId })

    const availabileDaySlots = dc.day[appday - 1]

    var AllavailableTimeSlots = ''

    for (let i = 0; i < dc.day[appday - 1].length; i++) {
        // if (!availabileDaySlots[i].isAvialable) {
        //     throw new CustomError.BadRequestError(
        //         `Doctor is not avialable at ${timings}`
        //     )
        // }
        if (
            availabileDaySlots[i].time === timings &&
            availabileDaySlots[i].isAvialable
        ) {
            const appointment = await Appointment.create({
                doctorId,
                clinicId,
                name,
                email,
                userId,
                timings: timings,
                day: appday,
            })
            availabileDaySlots[i].isAvialable = false
        }
        if (availabileDaySlots[i].isAvialable) {
            AllavailableTimeSlots =
                AllavailableTimeSlots + ` ${availabileDaySlots[i].time}`
        }
    }

    if (AllavailableTimeSlots === '') {
        throw new CustomError.NotFoundError(
            `Time slot is already booked check for other day and time`
        )
    }

    dc.markModified('day')

    await dc.save()

    res.status(StatusCodes.CREATED).json({
        msg: `appointment taken successfully at ${timings} .Check in Appointments for further detail`,
        success: true,
    })
}

const getAllAppointments = async (req, res) => {
    const appointment = await Appointment.find({ userId: req.user.userId })
        .populate('clinicId')
        .populate('doctorId')

    if (appointment.length === 0) {
        throw new CustomError.NotFoundError(`No appointments Found`)
    }

    res.status(StatusCodes.OK).json({ data: appointment, success: true })
}

const cancelAppointment = async (req, res) => {
    const { doctorId, clinicId, timings, day, id } = req.body
    const { userId } = req.user

    let dc = await DoctorClinic.findOne({ clinicId, doctorId })
    if (!dc) {
        throw new CustomError.BadRequestError(`no clinic or doctor found `)
    }

    const availabileDaySlots = dc.day[day - 1]

    for (let i = 0; i < dc.day[day - 1].length; i++) {
        if (availabileDaySlots[i].time === timings) {
            console.log(availabileDaySlots[i].isAvialable)
            availabileDaySlots[i].isAvialable = true
        }
    }

    dc.markModified('day')
    await dc.save()

    const appointment = await Appointment.findOneAndDelete({ _id: id })

    if (!appointment) {
        throw new CustomError.BadRequestError(`no such appointment found`)
    }

    res.status(StatusCodes.OK).json({
        data: 'Appointment Cancelled Successfully !!!',
        success: true,
    })
}

module.exports = { takeAppointment, getAllAppointments, cancelAppointment }

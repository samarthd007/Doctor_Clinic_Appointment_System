const { StatusCodes } = require('http-status-codes')
const CustomError = require('../Errors')
const DoctorClinic = require('../models/DoctorClinicSchema')

const createDoctorClinic = async (req, res) => {
    const { clinicId, doctorId, day } = req.body
    if (!clinicId || !doctorId) {
        throw new CustomError.BadRequestError(
            'Invalid Request with no credentials'
        )
    }

    ifExist = await DoctorClinic.findOne({ clinicId, doctorId })

    if (ifExist) {
        throw new CustomError.ConflictError(
            `This doctor is already assigned to this clinic`
        )
    }

    const dc = await DoctorClinic.create({ clinicId, doctorId, day })

    res.status(StatusCodes.CREATED).json({ data: dc, success: true })
}

const getAllClinicsDoctors = async (req, res) => {
    const dc = await DoctorClinic.find({})

    if (dc.length == 0) {
        throw new CustomError.NotFoundError('No Clinics Doctors Found')
    }

    res.status(StatusCodes.OK).json({ data: dc, success: true })
}

const getAllClinicByDoctorID = async (req, res) => {
    const { doctorId } = req.body
    if (!doctorId) {
        throw new CustomError.BadRequestError(
            'Invalid Request with no credentials'
        )
    }

    const dc = await DoctorClinic.find({ doctorId }).populate('clinicId')

    if (!dc) {
        throw new CustomError.NotFoundError(
            'No Clinics found for the given ID '
        )
    }

    res.status(StatusCodes.OK).json({
        data: dc,
        success: true,
    })
}

const getAllDoctorByClinicID = async (req, res) => {
    const { clinicId } = req.body
    if (!clinicId) {
        throw new CustomError.BadRequestError(
            'Invalid Request with no credentials'
        )
    }

    const dc = await DoctorClinic.find({ clinicId }).populate('doctorId')

    if (!dc) {
        throw new CustomError.NotFoundError(
            'No doctors found for the given ID '
        )
    }

    res.status(StatusCodes.OK).json({ data: dc, success: true })
}

const getTimings = async (req, res) => {
    const { clinicId, doctorId, timings } = req.body
    if (!clinicId || !doctorId) {
        throw new CustomError.BadRequestError('Invalid Request ')
    }

    const dc = await DoctorClinic.findOne({
        clinicId,
        doctorId,
        timings,
    })

    if (!dc) {
        throw new CustomError.NotFoundError(
            `Doctor is only avialable between ${dc.timings}`
        )
    }

    res.status(StatusCodes.OK).json({
        msg: `Doctor is avialable between . Please Book an appointment`,
        success: true,
    })
}

const checkAvilability = async (req, res) => {
    const { clinicId, doctorId, time, day } = req.body

    const dc = await DoctorClinic.findOne({ clinicId, doctorId })

    if (!dc) {
        throw new CustomError.NotFoundError(
            `Doctor not available in this clinic at  this time`
        )
    }
    // const availableTimeSlots = dc.time

    const availabileDaySlots = await dc.day[day - 1]

    var AllavailableTimeSlots = ''

    for (let i = 0; i < dc.day[day - 1].length; i++) {
        if (
            availabileDaySlots[i].time === time &&
            !availabileDaySlots[i].isAvialable
        ) {
            throw new CustomError.NotFoundError(
                `Doctor slot is not avilable for  ${time}  check fo other slots`
            )
        }
        if (
            availabileDaySlots[i].time === time &&
            availabileDaySlots[i].isAvialable
        ) {
            res.status(StatusCodes.OK).json({
                data: `Doctor is avialable at ${time} you can proceed to book appointment`,
                success: true,
            })
        }
        if (availabileDaySlots[i].isAvialable) {
            AllavailableTimeSlots =
                AllavailableTimeSlots + ` ${availabileDaySlots[i].time}`
        }
    }

    if (AllavailableTimeSlots === '') {
        throw new CustomError.NotFoundError(
            `All Time Slots booked for the Doctor check some other day`
        )
    }
    if (AllavailableTimeSlots.length > 1) {
        throw new CustomError.NotFoundError(
            `Doctor is only  Avialable at ${AllavailableTimeSlots}`
        )
    }
}

const updateDC = async (req, res) => {
    const { update, clinicId, doctorId } = req.body

    if (!clinicId || !doctorId) {
        throw new CustomError.BadRequestError('Invalid request')
    }

    const dc = await DoctorClinic.findOneAndUpdate(
        { clinicId, doctorId },
        { day: update }
    )

    res.status(StatusCodes.OK).json({
        data: 'updated successfully',
        success: true,
    })
}

module.exports = {
    getAllClinicByDoctorID,
    getAllDoctorByClinicID,
    createDoctorClinic,
    getAllClinicsDoctors,
    getTimings,
    checkAvilability,
    updateDC,
}

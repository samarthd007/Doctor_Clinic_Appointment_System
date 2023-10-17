const { StatusCodes } = require('http-status-codes')
const CustomError = require('../Errors')
const Doctor = require('../models/Doctor')
const Clinic = require('../models/Clinic')

const createDoctorDetails = async (req, res) => {
    const { name, degree, specialization, email, feePerConsultation } = req.body

    const ifdoctor = await Doctor.findOne({ email })
    if (ifdoctor) {
        throw new CustomError.BadRequestError(
            `Doctor with email ${email} already exist`
        )
    }

    const doctor = await Doctor.create({
        email,
        specialization,
        name,
        degree,

        feePerConsultation,
    })

    res.status(StatusCodes.CREATED).json({
        msg: 'Doctor details Created succesfully',
    })
}

const getAllDoctorDetails = async (req, res) => {
    const doctor = await Doctor.find({})

    if (doctor.length == 0) {
        throw new CustomError.NotFoundError(`No Doctor details found`)
    }

    res.status(StatusCodes.OK).json({
        data: doctor,
        success: true,
    })
}

const getDoctorByName = async (req, res) => {
    const { name } = req.body

    if (!name) {
        throw new CustomError.BadRequestError(`please provide name`)
    }

    const doctor = await Doctor.find({ name })

    if (!doctor) {
        throw new CustomError.NotFoundError(`No Doctor Found with name ${name}`)
    }

    res.status(StatusCodes.OK).json({ msg: doctor, success: true })
}

const getDoctorById = async (req, res) => {
    const doctorId = req.body.id

    if (!req.body.id) {
        throw new CustomError.BadRequestError(`please provide id`)
    }

    const doctor = await Doctor.findOne({ _id: doctorId })

    if (!doctor) {
        throw new CustomError.NotFoundError(`No Doctor Found with ID ${id}`)
    }

    res.status(StatusCodes.OK).json({
        data: doctor,
        success: true,
    })
}

module.exports = {
    getAllDoctorDetails,
    getDoctorByName,
    createDoctorDetails,
    getDoctorById,
}

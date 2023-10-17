const { StatusCodes } = require('http-status-codes')
const CustomError = require('../Errors')
const Clinic = require('../models/Clinic')

const getAllClinics = async (req, res) => {
    const clinic = await Clinic.find({})

    if (clinic.length == 0) {
        throw new CustomError.NotFoundError('No clinics found')
    }

    res.status(StatusCodes.OK).json({ data: clinic, success: true })
}

const createClinic = async (req, res) => {
    const { name, email, address, phoneNumber } = req.body

    if (!name || !email || !address) {
        throw new CustomError.BadRequestError('please enter all credentials')
    }

    const ifExist = await Clinic.findOne({ email })

    if (ifExist) {
        throw new CustomError.BadRequestError(
            'An account with this email already exist and doctor'
        )
    }

    const clinic = await Clinic.create({
        name,
        email,

        address,
        phoneNumber,
    })

    res.status(StatusCodes.CREATED).json({ data: clinic, success: true })
}

const getDoctorByClinic = async (req, res) => {
    const { clinicId, doctorId } = req.body
    if (!clinicId) {
        throw new CustomError.BadRequestError(
            `No doctors avialable in this clinic`
        )
    }

    const doctors = Clinic.find({ _id: clinicId, doctorId })

    if (!doctors) {
        throw new CustomError.BadRequestError(
            `No doctors avialable in this clinic`
        )
    }

    res.status(StatusCodes.OK).json({ data: doctors.doctorId })
}

const getClinicById = async (req, res) => {
    const { id } = req.body
    if (!id) {
        throw new CustomError.BadRequestError('Clicnic does not exist')
    }

    const clinic = await Clinic.findOne({ _id: id })

    if (!clinic) {
        throw new CustomError.NotFoundError(`no clinics found`)
    }

    res.status(StatusCodes.OK).json({ data: clinic, success: true })
}

module.exports = {
    createClinic,
    getAllClinics,
    getDoctorByClinic,
    getClinicById,
}

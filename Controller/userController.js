const { StatusCodes } = require('http-status-codes')
const CustomError = require('../Errors')
const User = require('../models/User')
const { isTokenValid } = require('../utils')

const getUser = async (req, res) => {
    const id = req.user.userId
    console.log(req.user.name)

    if (!id) {
        throw new CustomError.BadRequestError(`User should login first`)
    }

    const user = await User.findOne({ _id: id }).select('email name  role')

    if (!user) {
        throw new CustomError.NotFoundError(
            `invalid credentials please login again`
        )
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: user,
    })
}

const getAllUsers = async (req, res) => {
    const user = await User.find({})

    if (!user) {
        throw new CustomError.NotFoundError('No users found')
    }

    res.status(StatusCodes.OK).json({ data: user })
}
module.exports = { getUser, getAllUsers }

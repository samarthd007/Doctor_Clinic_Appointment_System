const { StatusCodes } = require('http-status-codes')
const CustomError = require('../Errors')
const User = require('../models/User')
const {
    createTokenUser,
    attachCookiesToResponse,
    createJWT,
} = require('../utils')

const register = async (req, res) => {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
        throw new CustomError.BadRequestError(`Enter required credentials`)
    }

    const ifExist = await User.findOne({ email })

    if (ifExist) {
        throw new CustomError.BadRequestError(
            `User already exist with email ${email}`
        )
    }

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({ email, password, name, role })

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.CREATED).json({
        msg: 'Registered Succesfully',
        success: true,
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError.BadRequestError(` Enter all Credentials`)
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new CustomError.NotFoundError(
            `user not found with email : ${email} please register`
        )
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new CustomError.BadRequestError(`Enter valid credentials`)
    }

    const tokenUser = createTokenUser(user)
    const token = createJWT({ payload: tokenUser })
    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.ACCEPTED).json({
        msg: 'Welcome !!!',
        success: true,
        token: token,
    })
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({
        msg: 'user logged out!!!',
        success: true,
    })
}

module.exports = {
    register,
    login,
    logout,
}

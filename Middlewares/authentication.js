const CustomError = require('../Errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        throw new CustomError.UnAuthenticatedError(
            'Authentication invalid with no user'
        )
    }

    try {
        const { name, userId, role } = isTokenValid({ token })
        req.user = { name, userId, role }

        next()
    } catch (error) {
        throw new CustomError.UnAuthenticatedError('Authentication invalid')
    }
}

const authorizePermissions = (role) => {
    return (req, res, next) => {
        if (req.user.role != role) {
            throw new CustomError.UnAuthenticatedError(
                'Unauthorized to access this route'
            )
        }
        next()
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions,
}

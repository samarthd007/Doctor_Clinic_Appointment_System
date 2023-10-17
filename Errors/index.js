const BadRequestError = require('./Bad-RequestError')
const ConflictError = require('./ConflictError')
const CustomAPIError = require('./custom-api')
const NotFoundError = require('./notFoundError')
const UnAuthenticatedError = require('./unAuthenticated')
const UnAuthorizedError = require('./unAuthorised')

module.exports = {
    CustomAPIError,
    UnAuthenticatedError,
    UnAuthorizedError,
    NotFoundError,
    BadRequestError,
    ConflictError,
}

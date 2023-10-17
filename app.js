require('dotenv').config()
require('express-async-errors')
const morgon = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

const bodyParser = require('body-parser')

//express Config
const express = require('express')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const cookieParser = require('cookie-parser')

//config
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(morgon('tiny'))
app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET))

//routes
const authRoutes = require('./routes/authRoutes')
app.use('/api/v1/auth', authRoutes)
const userRoutes = require('./routes/userRoute')
app.use('/api/v1/user', userRoutes)
const doctorRoute = require('./routes/doctorRoute')
app.use('/api/v1/doctor', doctorRoute)
const clinicRoute = require('./routes/clinicRoutes')
app.use('/api/v1/clinic', clinicRoute)
const appointRoute = require('./routes/appointRoute')
app.use('/api/v1/appointment', appointRoute)
const dcRoute = require('./routes/dcRoute')
app.use('/api/v1/dc', dcRoute)

//notfound Route
const notFoundHandler = require('./Middlewares/not-found')
app.use(notFoundHandler)

//errorhandler route
const errorHandler = require('./Middlewares/errorHandlerMiddleware')
app.use(errorHandler)

//Database connection
const connect = require('./Database/db')
const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(port, console.log(`server is up and running in ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

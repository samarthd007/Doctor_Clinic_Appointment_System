const mongoose = require('mongoose')

const AppointmentSchems = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'provide  name'],
        },

        email: {
            type: String,
            required: [true, 'provide doctor email'],
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Doctor',
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Clinic',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        timings: {
            type: String,
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

module.exports = mongoose.model('Appointment', AppointmentSchems)

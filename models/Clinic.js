const mongoose = require('mongoose')

const ClinicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'provide doctor name'],
        },
        email: {
            type: String,
            required: [true, 'provide doctor email'],
        },

        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            default: 997654321,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

module.exports = mongoose.model('Clinic', ClinicSchema)

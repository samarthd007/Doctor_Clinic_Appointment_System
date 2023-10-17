const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'provide doctor name'],
        },
        email: {
            type: String,
            required: [true, 'provide doctor email'],
            unique: true,
        },

        degree: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },

        feePerConsultation: {
            type: Number,
            required: true,
        },

        experience: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

module.exports = mongoose.model('Doctor', DoctorSchema)

const mongoose = require('mongoose')

const doctorClinicSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true,
    },
    day: {
        type: Array,
        required: true,
    },
})

module.exports = mongoose.model('DoctorClinic', doctorClinicSchema)

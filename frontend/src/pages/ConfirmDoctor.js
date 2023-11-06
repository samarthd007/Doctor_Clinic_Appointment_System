import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import axios from 'axios'
import toast from 'react-hot-toast'

function ConfirmDoctor() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [appointment, setAppointment] = useState(false)

    const bookAppointment = async () => {
        try {
            dispatch(showLoading())

            const res = await axios
                .post('/api/v1/appointment/take-appointment', {
                    clinicId: params.clinicId,
                    doctorId: params.doctorId,
                    timings: params.time,
                    appday: params.day,
                })
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })

            setAppointment(!appointment)

            dispatch(hideLoading())

            if (res.success) {
                toast.success(res.msg)
            }
        } catch (error) {}
    }

    console.log(appointment)

    useEffect(() => {
        bookAppointment()
    }, [])
    return (
        <Layout>
            {appointment ? (
                <div className="not-exceed">
                    <h1 className=" final-appointment">
                        Appointment Taken SuccessFul ✓
                    </h1>
                    <h3 className="sub-final">
                        Check in Appointments section for more details
                    </h3>
                </div>
            ) : (
                navigate(`/`)
            )}
        </Layout>
    )
}

export default ConfirmDoctor

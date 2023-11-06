import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'

import { List, Typography, Card, Button } from 'antd'
import toast from 'react-hot-toast'
import axios from 'axios'
import 'antd/dist/reset.css'

function Appointments() {
    const appointments = [
        {
            id: 1,
            doctorName: 'Dr. Smith',
            appointmentDate: '2023-10-15',
            patientName: 'John Doe',
        },
        {
            id: 2,
            doctorName: 'Dr. Johnson',
            appointmentDate: '2023-10-17',
            patientName: 'Jane Smith',
        },
        // Add more appointments as needed
    ]

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [appointment, setAppointment] = useState([])

    const getAllAppointment = async () => {
        try {
            const workingDays = [
                { day: 'Monday', value: 1 },
                { day: 'Tuesday', value: 2 },
                { day: 'Wednesday', value: 3 },
                { day: 'Thursday', value: 4 },
                { day: 'Friday', value: 5 },
                { day: 'Saturday', value: 6 },
            ]
            dispatch(showLoading())

            const res = await axios
                .get('/api/v1/appointment/get-all-appointment')
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })

            dispatch(hideLoading())

            if (res.success) {
                setAppointment(res.data)
            }
        } catch (error) {}
    }

    const cancelAppointment = async ({ clinicId, doctorId, day, timings }) => {
        try {
            dispatch(showLoading())

            const res = await axios
                .post('/api/v1/appointment/cancel', {
                    id: appointment[0].id,

                    clinicId: clinicId,
                    doctorId: doctorId,
                    day: day,
                    timings: timings,
                })
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })

            dispatch(hideLoading())

            if (res.success) {
                toast.success(res.data)
                navigate('/')
            }
        } catch (error) {}
    }

    useEffect(() => {
        getAllAppointment()
    }, [])

    return (
        <Layout>
            <div className="not-exceed">
                <h1 className="page-title">All Appointments</h1>
                <hr />

                <div style={{ padding: '20px' }}>
                    <List
                        dataSource={appointment}
                        renderItem={(item) => (
                            <List.Item>
                                <Card
                                    title={`Appointment with Dr ${item.doctorId.name}`}
                                    style={{ width: 380 }}
                                >
                                    <p className="appoint">
                                        Patient: {item.name}
                                    </p>
                                    <p className="appoint">Day: {item.day}</p>
                                    <p className="appoint">
                                        Time: {item.timings}
                                    </p>
                                    <p className="appoint">
                                        Doctor Fee :
                                        {item.doctorId.feePerConsultation}
                                    </p>
                                    <p className="appoint">
                                        Clinic Name :{item.clinicId.name}
                                    </p>
                                    <Button
                                        className="primary-button"
                                        type="primary"
                                        onClick={() => {
                                            cancelAppointment({
                                                clinicId: item.clinicId._id,
                                                doctorId: item.doctorId._id,
                                                timings: item.timings,
                                                day: item.day,
                                            })
                                        }}
                                    >
                                        Cancel Appointment
                                    </Button>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Appointments

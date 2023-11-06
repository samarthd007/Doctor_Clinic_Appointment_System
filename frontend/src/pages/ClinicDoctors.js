import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { List, Button, Space, DatePicker, TimePicker, Select } from 'antd'
function ClinicDoctors() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [doctors, setDoctors] = useState([])
    const [clinic, setClinic] = useState(null)

    const [time, setTime] = useState(null)

    const { Option } = Select

    const [selectedDay, setSelectedDay] = useState(null)
    const [send, setSend] = useState(null)

    const workingDays = [
        { day: 'Monday', value: 1 },
        { day: 'Tuesday', value: 2 },
        { day: 'Wednesday', value: 3 },
        { day: 'Thursday', value: 4 },
        { day: 'Friday', value: 5 },
        { day: 'Saturday', value: 6 },
    ]

    const today = new Date().getDay()

    const handleTimeChange = (time) => {
        setTime(time)
    }

    const checkAvilability = async (doctorId) => {
        let send = 0
        if (time.$m === 0) {
            send = `${time.$H}:${time.$m}0`
        } else {
            send = `${time.$H}:${time.$m}`
        }
        try {
            dispatch(showLoading())

            const res = await axios
                .post(`/api/v1/dc/check-availability`, {
                    doctorId: doctorId,
                    clinicId: params.id,
                    time: send,
                    day: selectedDay,
                })
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })
            setSend(send)

            dispatch(hideLoading())

            if (res.success) {
                toast.success(res.data)
            } else {
                toast.error(res.msg)
            }
        } catch (error) {}
    }

    const getClinic = async () => {
        try {
            dispatch(showLoading())

            const res = await axios
                .post(`/api/v1/clinic/get-clinic-id`, {
                    id: params.id,
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
                setClinic(res.data)
            }
        } catch (error) {}
    }

    const getDoctors = async () => {
        try {
            dispatch(showLoading())

            const res = await axios
                .post(`/api/v1/dc/get-doctors-dc`, {
                    clinicId: params.id,
                })
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })

            setDoctors(res.data)
            dispatch(hideLoading())
        } catch (error) {}
    }

    useEffect(() => {
        getClinic()
        getDoctors()
    }, [])

    return (
        <Layout>
            {clinic && (
                <div className="not-exceed">
                    <h1 className="page-title"> {clinic.name}</h1>
                    <h6 className="sub-title">
                        {' '}
                        {clinic.address} ,{clinic.phoneNumber}
                    </h6>
                    <hr />
                    <div className="page-title">
                        <List
                            itemLayout="horizontal"
                            dataSource={doctors}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.doctorId.name}
                                        description={
                                            item.doctorId.specialization
                                        }
                                    />
                                    <div>
                                        <Space>
                                            <div className="d-flex flex-column">
                                                <Select
                                                    placeholder="Select a working day"
                                                    style={{ width: 200 }}
                                                    onChange={(value) =>
                                                        setSelectedDay(value)
                                                    }
                                                    disabled={today > 5}
                                                >
                                                    {workingDays
                                                        .filter(
                                                            (day) =>
                                                                day.value >=
                                                                today
                                                        )
                                                        .map((day) => (
                                                            <Option
                                                                key={day.value}
                                                                value={
                                                                    day.value
                                                                }
                                                            >
                                                                {day.day}
                                                            </Option>
                                                        ))}
                                                </Select>
                                                <TimePicker
                                                    onChange={handleTimeChange}
                                                    format="HH:mm"
                                                    minuteStep={30}
                                                />
                                            </div>
                                            <Button
                                                className="primary-button"
                                                type="primary"
                                                onClick={() => {
                                                    checkAvilability(
                                                        item.doctorId.id
                                                    )
                                                }}
                                            >
                                                Check Availability
                                            </Button>
                                            <Button
                                                className="primary-button"
                                                type="primary"
                                                onClick={() =>
                                                    navigate(
                                                        `/clinic/${params.id}/${item.doctorId.id}/${send}/${selectedDay}`
                                                    )
                                                }
                                            >
                                                Take Appointment
                                            </Button>
                                        </Space>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default ClinicDoctors

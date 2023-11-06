import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
    List,
    Button,
    Space,
    DatePicker,
    TimePicker,
    Table,
    Menu,
    Dropdown,
    Select,
} from 'antd'
import moment from 'moment'

function BookAppointment() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState(null)
    const [clinic, setClinic] = useState([])

    const [isAvialable, setIsAvialable] = useState(false)
    const [send, setSend] = useState(null)

    const [time, setTime] = useState()

    const { Option } = Select

    const [selectedDay, setSelectedDay] = useState(null)

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

    const getDoctor = async () => {
        try {
            dispatch(showLoading())
            const id = { id: params.id }
            const res = await axios
                .post(`/api/v1/doctor/get-doctorId`, id)
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })

            dispatch(hideLoading())

            if (res.success) {
                setDoctor(res.data)
            }
        } catch (error) {}
    }

    const getClinics = async () => {
        try {
            dispatch(showLoading())

            const res = await axios
                .post(`/api/v1/dc/get-clinics-dc`, {
                    doctorId: params.id,
                })
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })

            setClinic(res.data)
            dispatch(hideLoading())
        } catch (error) {}
    }

    const checkAvilability = async (clinicId) => {
        let send = `${time.$H}:${time.$m}`
        if (time.$m === 0) {
            send = `${time.$H}:${time.$m}0`
        } else {
            send = `${time.$H}:${time.$m}`
        }
        setSend(send)
        try {
            dispatch(showLoading())

            const res = await axios
                .post(`/api/v1/dc/check-availability`, {
                    doctorId: params.id,
                    clinicId: clinicId,
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

            dispatch(hideLoading())

            if (res.success) {
                toast.success(res.data)
            } else {
                toast.error(res.msg)
            }
        } catch (error) {}
    }

    useEffect(() => {
        getDoctor()
        getClinics()
    }, [])

    return (
        <Layout>
            {doctor && (
                <div className="not-exceed">
                    <h1 className="page-title">Dr {doctor.name}</h1>
                    <h6 className="sub-title">
                        {' '}
                        {doctor.specialization} ,{doctor.degree}
                    </h6>
                    <hr />
                    <div className="page-title">
                        <List
                            itemLayout="horizontal"
                            dataSource={clinic}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.clinicId.name}
                                        description={item.clinicId.address}
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
                                                        item.clinicId.id
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
                                                        `/apply-doctor/${params.id}/${item.clinicId.id}/${send}/${selectedDay}`
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

export default BookAppointment

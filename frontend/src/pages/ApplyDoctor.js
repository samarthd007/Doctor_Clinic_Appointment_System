import Layout from '../components/Layout'
import { Col, Form, Input, Row } from 'antd'
import { List, Button, Avatar } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { Link, useNavigate } from 'react-router-dom'
import ApplyForDoctor from '../components/ApplyForDoctor'
import { useState, useEffect } from 'react'
import BookAppointment from './BookAppointment'

function ApplyDoctor() {
    const [doctor, setDoctors] = useState([])
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const getDoctorData = async () => {
        try {
            dispatch(showLoading())
            const res = await axios
                .get('/api/v1/doctor/get-all-doctors')
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })
            dispatch(hideLoading())

            if (res.success) {
                setDoctors(res.data)
            }
        } catch (error) {}
    }

    useEffect(() => {
        getDoctorData()
    }, [])

    return (
        <Layout>
            <div className="not-exceed">
                <h1 className="page-title">All Doctors List</h1>
                <hr />
                <List
                    itemLayout="horizontal"
                    dataSource={doctor}
                    renderItem={(doctor) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={doctor.avatar} />}
                                title={<h3>Dr {doctor.name}</h3>}
                                description={doctor.specialization}
                            />
                            <Button
                                className="primary-button"
                                type="primary"
                                onClick={() =>
                                    navigate(`/apply-doctor/${doctor._id}`)
                                }
                            >
                                Check Avialability
                            </Button>
                        </List.Item>
                    )}
                />
            </div>
        </Layout>
    )
}
export default ApplyDoctor

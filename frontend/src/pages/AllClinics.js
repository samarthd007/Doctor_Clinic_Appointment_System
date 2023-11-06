import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { List, Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function AllClinics() {
    const [clinics, setClinics] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getClinicData = async () => {
        try {
            dispatch(showLoading())
            const res = await axios
                .get('/api/v1/clinic/get-all-clinic')
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })
            dispatch(hideLoading())

            if (res.success) {
                setClinics(res.data)
            }
        } catch (error) {}
    }
    console.log(clinics)

    useEffect(() => {
        getClinicData()
    }, [])

    return (
        <Layout>
            <div className="not-exceed">
                <h1 className="page-title">All Clinic List</h1>
                <hr />

                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={clinics}
                    renderItem={(clinic) => (
                        <List.Item>
                            <Card title={clinic.name}>
                                <p>Address: {clinic.address}</p>
                                <p>Phone Number: {clinic.phoneNumber}</p>

                                <div className="d-flex">
                                    <Button
                                        className="primary-button"
                                        type="primary"
                                        onClick={() =>
                                            navigate(`/clinic/${clinic.id}`)
                                        }
                                    >
                                        Check For Doctor's
                                    </Button>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </Layout>
    )
}

export default AllClinics

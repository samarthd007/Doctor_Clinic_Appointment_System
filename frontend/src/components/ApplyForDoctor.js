import React from 'react'
import Layout from './Layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ApplyForDoctor() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios
                .post(
                    '/api/v1/appointment/take-appointment',
                    { ...values, doctorId: '1234', clinicId: '1234' },
                    { withCredentials: true }
                )
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })
            dispatch(hideLoading())
            toast.success(res.msg)
            if (res.success) {
                navigate('/home')
            }
        } catch (error) {}
    }

    return (
        <Layout>
            <h1 className="page-title">Apply For a Doctor</h1>
            <hr />

            <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item
                            required
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item
                            required
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item
                            required
                            label="Phone"
                            name="phoneNumber"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item
                            required
                            label="Address"
                            name="address"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Address" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item
                            required
                            label="Timings"
                            name="timings"
                            rules={[{ required: true }]}
                        >
                            <TimePicker.RangePicker format="HH:MM" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end">
                    <Button className="primary-button" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyForDoctor

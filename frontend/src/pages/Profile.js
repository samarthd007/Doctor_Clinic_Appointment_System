import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import axios from 'axios'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertsSlice'

import { Row, Col, Typography, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import 'antd/dist/reset.css'

const { Title, Text } = Typography

const ProfilePage = () => {
    const dispatch = useDispatch()

    const [profileData, setProfileData] = useState({})

    const getProfilePage = async () => {
        try {
            dispatch(showLoading())
            const res = await axios
                .post('/api/v1/user/get-user')
                .then((response) => {
                    return response.data
                })
                .catch((err) => {
                    let message = err.response.data.msg
                    toast.error(message)
                })

            dispatch(hideLoading())

            setProfileData(res.data)
        } catch (error) {}
    }

    useEffect(() => {
        getProfilePage()
    }, [])

    return (
        <Layout>
            <h1 className="profile-title">Profile Page</h1>
            {profileData && (
                <div style={{ padding: '20px' }}>
                    <Card style={{ width: 450, margin: '0 auto', height: 300 }}>
                        <Row gutter={16} align="middle">
                            <Col span={8}>
                                <Avatar size={64} icon={<UserOutlined />} />
                            </Col>
                            <Col span={16}>
                                <Title level={3}>{profileData.name}</Title>
                                <Text strong>Email:</Text>
                                <br />
                                <Text>{profileData.email}</Text>
                                <br />
                                <Text strong>Patient ID:</Text>
                                <br />
                                <Text>{profileData._id}</Text>
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}
        </Layout>
    )
}

export default ProfilePage

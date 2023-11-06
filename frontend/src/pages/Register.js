import React from 'react'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (value) => {
        try {
            dispatch(showLoading())
            const res = await axios
                .post('/api/v1/auth/register', value, { withCredentials: true })
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
                navigate('/login')
            }
        } catch (error) {}
    }

    return (
        <div className="auth">
            <div className="register-form card p-2">
                <h1 className="card-title"> We are here for you</h1>
                <Form layout="vertical" onFinish={onFinish} method="post">
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" />
                    </Form.Item>
                    <Button
                        className="primary-button mt-3 mb-3"
                        htmlType="submit"
                    >
                        Register
                    </Button>
                    <Link className="anchor mt-2" to="/login">
                        click here to login
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default Register

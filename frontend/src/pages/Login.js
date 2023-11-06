import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import ProtectedRoute from '../components/ProtectedRoute'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (value) => {
        try {
            dispatch(showLoading())

            const res = await axios
                .post('/api/v1/auth/login', value, { withCredentials: true })
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
                navigate('/')

                localStorage.setItem('token', res.token)
            }
        } catch (error) {}
    }

    return (
        <div className="auth">
            <div className="register-form card p-2">
                <h1 className="card-title"> Welcome Back</h1>
                <Form layout="vertical" onFinish={onFinish}>
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
                        Login
                    </Button>
                    <Link className="anchor mt-2" to="/register">
                        click here to register
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default Login

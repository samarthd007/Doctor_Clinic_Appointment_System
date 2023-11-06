import React, { useState } from 'react'
import '../Layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'

const adminMenu = [
    {
        name: 'Home',
        path: '/',
        icon: 'ri-home-line',
    },
    {
        name: 'Doctors',
        path: '/doctors',
        icon: 'ri-chat-heart-line',
    },
    {
        name: 'All Appointments',
        path: '/all-appointments',
        icon: 'ri-file-list-line',
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'ri-profile-line',
    },
]

const userMenu = [
    {
        name: 'Home',
        path: '/',
        icon: 'ri-home-line',
    },
    {
        name: 'Appointments',
        path: '/appointments',
        icon: 'ri-file-list-line',
    },
    {
        name: 'Apply for a  Doctor',
        path: '/apply-doctor',
        icon: 'ri-chat-heart-line',
    },

    {
        name: 'Clinics',
        path: '/clinic',
        icon: 'ri-hospital-fill',
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'ri-profile-line',
    },
]

const Layout = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [collpased, setcollapsed] = useState(false)
    const { user } = useSelector((state) => state.user)

    const menuToBeRendered = user?.role === 'admin' ? adminMenu : userMenu

    return (
        <div className="main">
            <div className="d-flex layout">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1 className="logo">Doc's</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <div
                                    className={`d-flex menu-item ${
                                        isActive && 'active-menu-item'
                                    }`}
                                >
                                    <i className={menu.icon}></i>
                                    {!collpased && (
                                        <Link to={menu.path}>{menu.name}</Link>
                                    )}
                                </div>
                            )
                        })}
                        <div
                            className={`d-flex menu-item `}
                            onClick={() => {
                                Logout()

                                navigate('/login')
                            }}
                        >
                            <i className="ri-logout-box-line"></i>
                            {!collpased && <Link to="/login">Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        {collpased ? (
                            <i
                                class="ri-menu-line header-action-icon"
                                onClick={() => setcollapsed(false)}
                            ></i>
                        ) : (
                            <i
                                className="ri-close-circle-line  header-action-icon"
                                onClick={() => setcollapsed(true)}
                            ></i>
                        )}

                        <div className="d-flex align-items-center px-3">
                            <i className="ri-notification-3-line header-action-icon px-2    "></i>
                            <Link className="anchor" to="/profile">
                                {user?.name}
                            </Link>
                        </div>
                    </div>
                    <div className="body">{children} </div>
                </div>
            </div>
        </div>
    )
}

export default Layout

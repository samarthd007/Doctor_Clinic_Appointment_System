import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'

import ApplyDoctor from './pages/ApplyDoctor'
import ApplyForDoctor from './components/ApplyForDoctor'
import AllClinics from './pages/AllClinics'
import BookAppointment from './pages/BookAppointment'
import ProfilePage from './pages/Profile'
import Appointments from './pages/Appointments'
import ClinicDoctors from './pages/ClinicDoctors'
import ConfirmDoctor from './pages/ConfirmDoctor'
import ConfirmClinic from './pages/ConfirmClinic'

function App() {
    const { loading } = useSelector((state) => state.alerts)

    return (
        <BrowserRouter>
            {loading && (
                <div class="spinner-parent">
                    <div class="spinner-border" role="status"></div>
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/apply-doctor"
                    element={
                        <ProtectedRoute>
                            <ApplyDoctor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/apply-for-doctor"
                    element={
                        <ProtectedRoute>
                            <ApplyForDoctor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/apply-doctor/:id"
                    element={
                        <ProtectedRoute>
                            <BookAppointment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/clinic"
                    element={
                        <ProtectedRoute>
                            <AllClinics />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clinic/:id"
                    element={
                        <ProtectedRoute>
                            <ClinicDoctors />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/apply-doctor/:doctorId/:clinicId/:time/:day"
                    element={
                        <ProtectedRoute>
                            <ConfirmDoctor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clinic/:clinicId/:doctorId/:time/:day"
                    element={
                        <ProtectedRoute>
                            <ConfirmClinic />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App

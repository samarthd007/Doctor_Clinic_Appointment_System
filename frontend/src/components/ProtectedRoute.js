import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser, reloadUserData } from '../redux/userSlice'
import { showLoading, hideLoading } from '../redux/alertsSlice'

function ProtectedRoute(props) {
    const { user, reloadUser } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getUser = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-user')
            dispatch(hideLoading())

            if (res.data.success) {
                dispatch(setUser(res.data.data))
                dispatch(reloadUserData(false))
            } else {
                localStorage.clear()
                navigate('/login')
            }
        } catch (error) {
            dispatch(hideLoading())
            localStorage.clear()
            navigate('/login')
        }
    }

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user, reloadUser])

    if (localStorage.getItem('token')) {
        return props.children
    } else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute

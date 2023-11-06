import axios from 'axios'
import toast from 'react-hot-toast'

const Logout = async () => {
    const res = await axios.get('api/v1/auth/logout')

    if (res.data.success) {
        localStorage.clear()
        toast.success(res.data.msg)
    } else {
        toast.error('something went wrong !!!')
    }
}

export default Logout

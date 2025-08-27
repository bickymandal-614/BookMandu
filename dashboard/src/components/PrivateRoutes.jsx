import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const {user}= useSelector((state)=> state.auth)

    if(user==null){
        <Navigate to='login' />
    }
    return user? <Outlet />: <Navigate to='login' />
}

export default PrivateRoutes
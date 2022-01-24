import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const RequiresAuth = () => {
    let { user } = useContext(AuthContext)
    if (!user) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

export default RequiresAuth;
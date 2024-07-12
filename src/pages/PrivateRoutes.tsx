import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
interface PrivateRouteProps {
    Component: React.ComponentType;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <Component />
    )
}

export default PrivateRoute

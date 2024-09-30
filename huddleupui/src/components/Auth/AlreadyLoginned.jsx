import useAuth from './useAuth'
import { Navigate } from 'react-router-dom';

const  AlreadyLoginned = ({ children }) => {
    const { token } = useAuth();

    if (token) {
      return <Navigate to="/feed" replace />;
    }

    return children;
};

export default AlreadyLoginned
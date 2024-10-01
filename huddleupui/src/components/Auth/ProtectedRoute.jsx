import useAuth from './useAuth'
import { Navigate } from 'react-router-dom';

const  ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
      return <Navigate to="/login" replace />;
    }else {
      return children;
    }
};

export default ProtectedRoute
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '@/context/context';


const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { admin } = useContext(authContext);

  if (!admin.authnticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(admin.user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

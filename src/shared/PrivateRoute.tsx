import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const PrivateRoute = () => {
  const { user, token } = useContext(AppContext) as any;

  if (token && user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-primary rounded-full animate-bounce"></div>
          <div className="w-6 h-6 bg-primary rounded-full animate-bounce delay-200"></div>
          <div className="w-6 h-6 bg-primary rounded-full animate-bounce delay-400"></div>
        </div>
      </div>
    ); 
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

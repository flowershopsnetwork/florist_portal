import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const PrivateRoute = () => {
  const { user, token } = useContext(AppContext) as any;
  const location = useLocation();

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

  const path = location.pathname;

  const floristRepresentativeAllowedRoutes = ["/", "/dashboard", "/florists"];

  const administratorAllowedRoutes = [
    "/",
    "/dashboard",
    "/users",
    "/products",
    "/collections",
    "/settings",
    "/florists",
    "/towns",
    "/provinces",
  ];

  const isAllowed = (allowedRoutes: string[]) =>
    allowedRoutes.some(
      (route) => path === route || path.startsWith(route + "/")
    );

  const hasAccess = () => {
    if (user.role === "Florist Representative") {
      return isAllowed(floristRepresentativeAllowedRoutes);
    }
    if (user.role === "Administrator") {
      return isAllowed(administratorAllowedRoutes);
    }
    return false;
  };

  if (!hasAccess()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

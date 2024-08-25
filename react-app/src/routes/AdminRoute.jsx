import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user?.role === "SYSTEM_ADMIN") return <Outlet />;
  return <Navigate to="/profile" state={{ from: location }} />;
};

export default AdminRoute;

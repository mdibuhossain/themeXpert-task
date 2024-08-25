import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const StsRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user?.role === "STS_MANAGER") return <Outlet />;
  return <Navigate to="/profile" state={{ from: location }} />;
};

export default StsRoute;

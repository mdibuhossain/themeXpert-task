import { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const ContractorRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user?.role === "CONTRACTOR_MANAGER") return <Outlet />;
  return <Navigate to="/profile" state={{ from: location }} />;
};

export default ContractorRoute;

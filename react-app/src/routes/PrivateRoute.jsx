import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location)
  // if (isLoading) return <p>Loading...</p>;
  if (!user?.email) return <Navigate to="/login" state={{ from: location }} />;
  return children;
};

export default RequireAuth;

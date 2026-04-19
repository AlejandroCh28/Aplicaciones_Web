import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === "seller") {
      return <Navigate to="/products" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
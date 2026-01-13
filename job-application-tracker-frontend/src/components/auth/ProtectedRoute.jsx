import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // NOT validated → redirect
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Validated → allow access
  return children;
};

export default ProtectedRoute;

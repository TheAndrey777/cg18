import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const user = useSelector((state: any) => state.user);

  return <>{user.isAuthorized ? children : <Navigate to="/auth" replace />}</>;
};

export default ProtectedRoute;

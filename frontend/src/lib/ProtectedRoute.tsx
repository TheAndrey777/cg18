import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/slices/user";

const ProtectedRoute = ({ children }: any) => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  if (!user.isAuthorized) dispatch(getUser());
  return <>{user.isAuthorized ? children : <Navigate to="/auth/login" />}</>;
};

export default ProtectedRoute;

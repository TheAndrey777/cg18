import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setRedirectPath } from "../redux/slices/user";
import React from "react";

const ProtectedRoute = ({ children }: any) => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  React.useEffect(() => {
    dispatch(setRedirectPath({ location: location.pathname }));
  }, []);
  return (
    <>
      {user.isAuthorized.value && user.isAdmin.value ? (
        children
      ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;

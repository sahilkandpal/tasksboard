import React from "react";
import { useAuthContext } from "../context/authContext";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLogin } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin) return <Component {...props} />;
        else return <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;

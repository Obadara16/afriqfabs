import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;

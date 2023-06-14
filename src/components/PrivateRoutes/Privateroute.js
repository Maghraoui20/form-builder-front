import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {

  let auth = JSON.parse(localStorage.getItem("profile"));

  return auth ? <Outlet /> : <Navigate to="/signin" />;
};
export default PrivateRoute;




import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element, ...props}) => {
  return (
    props.isLoggedIn ? element : <Navigate to="/" replace/>
)}

export default ProtectedRouteElement; 
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element, ...props }) => {
  return (
    props.isLoggedIn && element ? element : props.isLoggedIn ? <Navigate to={`${window.location.pathname}`} replace/> : <Navigate to="/" replace/>
)}

export default ProtectedRouteElement;

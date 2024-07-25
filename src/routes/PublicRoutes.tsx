import React from "react";
import { Route, Navigate } from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated: boolean;
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated, element }) => {
  return isAuthenticated ? <Navigate to="/dashboard" /> : element;
};

export default PublicRoute;

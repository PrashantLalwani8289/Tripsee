import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';
import { useSelector } from "react-redux";
import { RootState } from "State Management/Store/Store";

// Admin Imports
const PublicRoute = lazy(() => import("./PublicRoutes"));
const PrivateRoute = lazy(() => import("./PrivateRoutes"));
const Dashboard = lazy(() => import("views/admin/default"));
const NFTMarketplace = lazy(() => import("views/admin/marketplace"));
const Profile = lazy(() => import("views/admin/profile"));
const DataTables = lazy(() => import("views/admin/dataTables"));
const RTL = lazy(() => import("views/admin/rtl"));

const SignInCentered = lazy(() => import("views/auth/signIn"));
const SignUpCentered = lazy(() => import("views/auth/signup"));



const RoutesConfig: React.FC = () => {
  const isAuthenticated = useSelector((state:RootState) => state.root.isAuthenticated)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute isAuthenticated={isAuthenticated} element={<SignInCentered />} />
          }
        />
         <Route
          path={ROUTES.SIGNUP}
          element={
            <PublicRoute isAuthenticated={isAuthenticated} element={<SignUpCentered />} />
          }
        />
        {/* Private Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<Dashboard />}
            />
          }
        />
        <Route
          path={ROUTES.MARKETPLACE}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<NFTMarketplace />}
            />
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} element={<Profile />} />
          }
        />
        <Route
          path={ROUTES.ADMIN_DATA_TABLES}
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<DataTables />} />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} />
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} />
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;

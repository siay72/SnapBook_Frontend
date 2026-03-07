import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Feed from "../pages/Feed";
import MainLayout from "../layouts/MainLayout";
import ActivateAccount from "../pages/ActivateAccount ";
import Profile from "../pages/Profile";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";
import ForgotPassword from "../pages/ForgotPassword";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate/:uid/:token" element={<ActivateAccount />} />

      {/* MainLayout Routes */}
      <Route
        element={ <MainLayout /> }>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Forgot password */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />

    </Routes>
  );
}
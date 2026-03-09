import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Feed from "../pages/Feed";
import MainLayout from "../layouts/MainLayout";
import ActivateAccount from "../pages/ActivateAccount ";
import Profile from "../pages/Profile";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";
import ForgotPassword from "../pages/ForgotPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";
import UsersVisible from "../pages/UsersVisible";

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

      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings/profile" element={<EditProfile />} />
        <Route path="/settings/change-password" element={<ChangePassword />} />
        <Route path="/dashboard/users" element={<UsersVisible />} />

      </Route>

    </Routes>
  );
}
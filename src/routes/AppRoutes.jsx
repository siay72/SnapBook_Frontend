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
import OrderHistory from "../pages/OrderHistory";
import PrivateRoute from "../components/PrivateRoute";
import ProfileFeeds from "../components/Profile/ProfileFeeds";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        {/* Forgot password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />

      <Route/>

      {/* MainLayout Routes */}
      <Route
        element={ <MainLayout /> }>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        
      </Route>

      

      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/myposts" element={<ProfileFeeds />} />
        <Route path="/settings/profile" element={<EditProfile />} />
        <Route path="/settings/change-password" element={<ChangePassword />} />
        <Route path="/dashboard/users" element={<UsersVisible />} />
        <Route path="/order-history" element={<OrderHistory />} />

      </Route>

    </Routes>
  );
}
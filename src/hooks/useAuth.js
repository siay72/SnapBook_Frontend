import { useEffect, useState } from "react";
import apiClient from "../services/auth-api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch Logged In User
  // -----------------------------
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user", error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Load user on refresh
  // -----------------------------
  useEffect(() => {
    if (authTokens) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens]);

  // -----------------------------
  // Handle API Errors
  // -----------------------------
  const handleAPIError = (
    error,
    defaultMessage = "Something went wrong! Try again."
  ) => {
    console.log(error);

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    }

    setErrorMsg(defaultMessage);

    return {
      success: false,
      message: defaultMessage,
    };
  };

  // -----------------------------
  // Login User
  // -----------------------------
  const loginUser = async (userData) => {
    setErrorMsg("");

    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);

      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      await fetchUserProfile();

      return {
        success: true,
        message: "Login successful",
      };
    } catch (error) {
      return handleAPIError(error, "Login failed");
    }
  };

  // -----------------------------
  // Register User
  // -----------------------------
  const registerUser = async (userData) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/", userData);

      return {
        success: true,
        message:
          "Registration successful. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration failed");
    }
  };

  // -----------------------------
  // Update Profile
  // -----------------------------
 const updateUserProfile = async (formData) => {

  try {

    const res = await apiClient.patch(
      `/profile/${user.id}/`,
      formData
    );

    const updatedUser = {
      ...res.data,
      profile_picture: res.data.profile_picture
        ? `${res.data.profile_picture}?v=${Date.now()}`
        : null
    };

    setUser(updatedUser);

    return { success: true, data: updatedUser };

  } catch (error) {

    console.log("PROFILE UPDATE ERROR:", error);

    setErrorMsg(error.response?.data || "Profile update failed");

    return { success: false };

  }

};
  // -----------------------------
  // Change Password
  // -----------------------------
  const changePassword = async (data) => {

  setErrorMsg("");

  try {

    await apiClient.post("/auth/users/set_password/", data);

    return {
      success: true
    };

  } catch (error) {

    return handleAPIError(error, "Failed to change password");

  }

};

  // -----------------------------
  // Request Password Reset
  // -----------------------------
  const requestPasswordReset = async (email) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/reset_password/", { email });

      return {
        success: true,
        message: "Password reset email sent. Check your inbox.",
      };
    } catch (error) {
      return handleAPIError(error, "Failed to send reset email");
    }
  };

  // -----------------------------
  // Confirm Password Reset
  // -----------------------------
  const confirmPasswordReset = async (data) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/reset_password_confirm/", data);

      return {
        success: true,
        message: "Password reset successful. You can login now.",
      };
    } catch (error) {
      return handleAPIError(error, "Password reset failed");
    }
  };

  // -----------------------------
  // Resend Activation Email
  // -----------------------------
  const resendActivationEmail = async (email) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/resend_activation/", { email });

      return {
        success: true,
        message: "Activation email resent successfully.",
      };
    } catch (error) {
      return handleAPIError(error, "Failed to resend activation email");
    }
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    authTokens,
    errorMsg,
    loading,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    requestPasswordReset,
    confirmPasswordReset,
    resendActivationEmail,
  };
};

export default useAuth;
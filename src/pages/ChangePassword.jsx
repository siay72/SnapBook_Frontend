import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import ErrorAlert from "../components/ErrorAlert";
import { Link } from "react-router-dom";

const ChangePassword = () => {

  const { changePassword, logoutUser, errorMsg } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    setLoading(true);

    const response = await changePassword({
      current_password: data.current_password,
      new_password: data.new_password,
      re_new_password: data.confirm_password
    });

    if (response?.success) {

      toast.success("Password changed successfully. Please login again.");

      reset();

      setTimeout(() => {
        logoutUser();
      }, 1500);

    } else {
      toast.error("Failed to change password");
    }

    setLoading(false);
  };

  return (

    <div
      className="flex min-h-screen items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-image.png')" }}
    >

      <div className="bg-linear-to-r from-pink-300 to-purple-300 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md">

        <div className="card-body">

          {errorMsg && <ErrorAlert error={errorMsg} />}

          <h2 className="text-4xl font-bold mb-6 text-black">
            Change Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Current Password */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Current Password
                </span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("current_password", {
                  required: "Current password is required"
                })}
              />

              {errors.current_password && (
                <span className="text-red-500 text-sm">
                  {errors.current_password.message}
                </span>
              )}

            </div>

            {/* New Password */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  New Password
                </span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />

              {errors.new_password && (
                <span className="text-red-500 text-sm">
                  {errors.new_password.message}
                </span>
              )}

            </div>

            {/* Confirm Password */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Confirm Password
                </span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match"
                })}
              />

              {errors.confirm_password && (
                <span className="text-red-500 text-sm">
                  {errors.confirm_password.message}
                </span>
              )}

            </div>

            {/* Show Password Toggle */}
            <div className="form-control">

              <label className="label cursor-pointer">

                <span className="text-sm text-black font-medium">
                  Show Password
                </span>

                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />

              </label>

              <div className="text-right">

                <Link
                  to="/forgot-password"
                  className="link link-primary text-sm"
                >
                  Forgot Password?
                </Link>

              </div>

            </div>

            <button className="btn btn-primary w-full">

              {loading ? "Updating..." : "Change Password"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default ChangePassword;
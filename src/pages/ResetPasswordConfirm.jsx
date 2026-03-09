import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErrorAlert";
import toast from "react-hot-toast";

const ResetPasswordConfirm = () => {

  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { confirmPasswordReset, errorMsg } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    setLoading(true);

    try {

      const response = await confirmPasswordReset({
        uid,
        token,
        new_password: data.password,
      });

      if (response?.success) {

        toast.success("Password reset successful!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      }

    } catch (error) {

      console.log("Reset password failed", error);
      toast.error("Password reset failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="flex min-h-screen items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-image.png')" }}
    >

      <div className="bg-linear-to-r from-pink-300 to-purple-300 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md">

        {errorMsg && <ErroAlert error={errorMsg} />}

        <h2 className="text-4xl font-bold mb-2 text-black">
          Reset Password
        </h2>

        <p className="text-gray-600 mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* New Password */}
          <div className="form-control">

            <label className="label">
              <span className="text-sm text-black font-medium">
                New Password
              </span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
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
              placeholder="••••••••"
              className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />

            {errors.confirm_password && (
              <span className="text-red-600 text-sm">
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

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>

    </div>

  );

};

export default ResetPasswordConfirm;
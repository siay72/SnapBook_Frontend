import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErrorAlert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {

  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
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
    delete data.confirm_password;

    try {

      const response = await registerUser(data);

      if (response.success) {

        setSuccessMsg(response.message);
        setRegisteredEmail(data.email);

        toast.success(
          "Registration successful! Please check your email to activate your account."
        );

      }

    } catch (error) {

      console.log("Registration failed", error);
      toast.error("Registration failed. Please try again.");

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

        <div className="card-body">

          {errorMsg && <ErroAlert error={errorMsg} />}

          {successMsg && (
            <div role="alert" className="alert alert-success">
              <span>{successMsg}</span>
            </div>
          )}

          {successMsg && (
            <p className="text-green-600 text-sm mt-2">
              Activation email sent to: {registeredEmail}
            </p>
          )}

          <h2 className="text-4xl font-bold mb-2 text-black">
            Sign Up
          </h2>

          <p className="text-gray-600 mb-6">
            Create an account to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

            {/* First Name */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  First Name
                </span>
              </label>

              <input
                type="text"
                placeholder="John"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("first_name", {
                  required: "First Name is Required",
                })}
              />

              {errors.first_name && (
                <span className="text-red-500 text-sm">
                  {errors.first_name.message}
                </span>
              )}

            </div>

            {/* Last Name */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Last Name
                </span>
              </label>

              <input
                type="text"
                placeholder="Doe"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("last_name", {
                  required: "Last Name is Required",
                })}
              />

              {errors.last_name && (
                <span className="text-red-500 text-sm">
                  {errors.last_name.message}
                </span>
              )}

            </div>

            {/* Email */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("email", {
                  required: "Email is Required",
                })}
              />

              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}

            </div>

            {/* Location */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Location
                </span>
              </label>

              <input
                type="text"
                placeholder="Dhaka"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("location")}
              />

            </div>

            {/* Phone */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Phone Number
                </span>
              </label>

              <input
                type="text"
                placeholder="0123456789"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("phone_number")}
              />

            </div>

            {/* Password */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Password
                </span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              {errors.password && (
                <span className="text-red-500 text-sm">
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
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
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

            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">

              {loading ? "Registering..." : "Register"}

            </button>

          </form>

          <div className="text-center mt-4">

            <p className="text-black/70">

              Already have an account?{" "}

              <Link to="/login" className="link link-primary">
                Sign in
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Register;
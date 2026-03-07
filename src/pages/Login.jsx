import { FaUser, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";

const Login = () => {

  const navigate = useNavigate();
  const { loginUser, errorMsg } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await loginUser(data);

      if (response?.success) {
        navigate("/"); // go to feed
      }
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center lg:justify-end px-4 lg:px-20 relative"
      style={{ backgroundImage: "url('/bg-image.png')" }}
    >

      {/* Navbar */}
      <div className="absolute top-6 left-10 flex items-center gap-6 text-white">
        <h1 className="text-2xl font-bold">SnapBook</h1>
        <p className="cursor-pointer">About</p>
        <p className="cursor-pointer">Upgrade</p>
      </div>

      {/* Welcome */}
      <div className="absolute bottom-1 left-10 text-white">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
      </div>

      {/* LOGIN CARD */}
      <div className="bg-linear-to-r from-pink-300 to-purple-300 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md">

        <h2 className="text-4xl font-bold mb-2 text-black">Login</h2>

        <p className="text-gray-600 mb-6">
          Hello Everyone, Welcome Back
        </p>

        {/* Error Message */}
        {errorMsg && (
          <div className="alert alert-error mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-black font-medium">
              Email Address
            </label>

            <div className="flex items-center bg-amber-300 border rounded-lg mt-1 px-3">
              <input
                type="email"
                placeholder="Test@gmail.com"
                className="w-full p-2 outline-none bg-transparent text-gray-900"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              <FaUser className="text-gray-400" />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-medium text-black">
              Password
            </label>

            <div className="flex items-center border rounded-lg mt-1 px-3 bg-amber-300">
              <input
                type="password"
                placeholder="********"
                className="w-full p-2 outline-none bg-transparent text-gray-900"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <FaEyeSlash className="text-gray-400" />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot */}
          <div className="text-right">
              <Link to="/forgot-password" className="link link-primary text-sm">
                Forgot Password?
              </Link>
            </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Logging..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>

        </form>

        <div className="text-center text-black mt-6">
          OR Connect With
        </div>

      </div>
    </div>
  );
};

export default Login;
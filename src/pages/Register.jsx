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
        toast.success("Registration successful! Please check your email to activate your account.");
      }
    } catch (error) {
      console.log("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    }
      finally { 
        setLoading(false);
      };
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-cover bg-center"
       style={{ backgroundImage: "url('/bg-image.png')" }}
    >
      <div className="bg-linear-to-r from-pink-300 to-purple-300 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md">
        <div className="card-body">

          {/* Error Alert */}
          {errorMsg && <ErroAlert error={errorMsg} />}

          {/* Success Message */}
          {successMsg && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

            {successMsg && (
                <p className="text-green-600 text-sm mt-2">
                    Activation email sent to: {registeredEmail}
                </p>
                )}

          <h2 className="text-4xl font-bold mb-2 text-black">Sign Up</h2>
          <p className="text-gray-600 mb-6">
            Create an account to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

            {/* First Name */}
            <div className="form-control">
              <label className="label" htmlFor="first_name">
                <span className="text-sm text-black font-medium">First Name</span>
              </label>

              <input
                id="first_name"
                type="text"
                placeholder="John"
                className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
                {...register("first_name", {
                  required: "First Name is Required",
                })}
              />

              {errors.first_name && (
                <span className="label-text-alt text-error">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label className="label" htmlFor="last_name">
                <span className="text-sm text-black font-medium">Last Name</span>
              </label>

              <input
                id="last_name"
                type="text"
                placeholder="Doe"
                className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
                {...register("last_name", {
                  required: "Last Name is Required",
                })}
              />

              {errors.last_name && (
                <span className="label-text-alt text-error">
                  {errors.last_name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="text-sm text-black font-medium">Email</span>
              </label>

              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
                {...register("email", {
                  required: "Email is Required",
                })}
              />

              {errors.email && (
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label" htmlFor="location">
                <span className="text-sm text-black font-medium">Location</span>
              </label>

              <input
                id="location"
                type="text"
                placeholder="Dhaka"
                className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
                {...register("location")}
              />
            </div>

            {/* Phone Number */}
            <div className="form-control">
              <label className="label" htmlFor="phone_number">
                <span className="text-sm text-black font-medium">Phone Number</span>
              </label>

              <input
                id="phone_number"
                type="text"
                placeholder="0123456789"
                className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
                {...register("phone_number")}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="text-sm text-black font-medium">Password</span>
              </label>

              <input
                id="password"
                type="password"
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
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="text-sm text-black font-medium">Confirm Password</span>
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
                })}
              />

              {errors.confirm_password && (
                <span className="label-text-alt text-error">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          {/* Login Link */}
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
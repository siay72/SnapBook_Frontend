import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErrorAlert";
import toast from "react-hot-toast";

const ForgotPassword = () => {

  const { register, handleSubmit } = useForm();
  const { requestPasswordReset, errorMsg } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {

    setLoading(true);

    try {

      const response = await requestPasswordReset(data.email);

      if (response?.success) {

        setMessage(response.message);

        toast.success(
          "Password reset link sent. Please check your email."
        );

      }

    } catch (error) {

      console.log("Reset request failed", error);
      toast.error("Failed to send reset email");

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

        <h2 className="text-4xl font-bold mb-2 text-black">
          Reset Password
        </h2>

        <p className="text-gray-600 mb-6">
          Enter your email to receive a reset link
        </p>


        {/* Error Alert */}
        {errorMsg && <ErroAlert error={errorMsg} />}


        {/* Success Message */}
        {message && (
          <div className="alert alert-success mt-2">
            {message}
          </div>
        )}


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

          {/* Email */}
          <div className="form-control">

            <label className="label">
              <span className="text-sm text-black font-medium">
                Email Address
              </span>
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              className="flex items-center text-sm text-black font-medium bg-amber-500 border rounded-lg mt-1 p-2 w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />

          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>

        </form>

      </div>

    </div>

  );
};

export default ForgotPassword;
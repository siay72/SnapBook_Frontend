import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import apiClient from "../services/auth-api-client";
import toast from "react-hot-toast";

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      if (!uid || !token) {
        setError("Invalid activation link.");
        setLoading(false);
        return;
      }

      try {
        await apiClient.post("/auth/users/activation/", {
          uid,
          token,
        });
        toast.success("Account activated successfully! Redirecting to login...");
        setMessage("Account activated successfully. Redirecting to login...");
      } catch (err) {
        console.log(err);

        setError(
          err.response?.data?.detail ||
            "Activation failed. Please check your activation link."
        );
      } finally {
        setLoading(false);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4"
       style={{ backgroundImage: "url('/bg-image.png')", backgroundSize: "cover" }}>
      <div className="card bg-base-100 shadow-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Account Activation
        </h2>

        {loading && (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-2">Activating your account...</p>
          </div>
        )}

        {message && (
          <div className="alert alert-success">
            <span>{message}</span>
          </div>
        )}

        {error && <ErrorAlert error={error} />}

      </div>
    </div>
  );
};

export default ActivateAccount;
import { useState } from "react";
import authApiClient from "../../services/auth-api-client";
import toast from "react-hot-toast";

const SubscriptionBanner = () => {

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {

    setLoading(true);

    try {

      const response = await authApiClient.post("/payment/initiate/", {
        amount: 100,
        order_id: Date.now()
      });

      const paymentUrl = response.data.payment_url;

      window.location.href = paymentUrl;

    } catch (error) {

      console.log("Payment error", error);
      toast.error("Failed to initiate payment");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between shadow-lg">

      <div>

        <h2 className="text-xl md:text-2xl font-bold">
          SnapBook Premium Subscription
        </h2>

        <p className="text-sm mt-1 opacity-90">
          Unlock premium features and enjoy Ads free SnapBook platform.
        </p>

      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
      >

        {loading ? "Processing..." : "Subscribe Now"}

      </button>

    </div>

  );

};

export default SubscriptionBanner;
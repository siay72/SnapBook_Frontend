import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authApiClient.get("/payments/");
        const data = res.data.results || res.data;

        setOrders(data);

        if (data.length > 0) {
          toast.success("Orders fetched successfully");
        } else {
          toast.error("No orders found");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "completed")
      return "bg-green-100 text-green-600";
    if (status === "pending")
      return "bg-yellow-100 text-yellow-600";
    if (status === "failed")
      return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6">
      
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
        Order History
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600 text-sm">
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Method</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 text-black font-medium">{order.order_id}</td>
                <td className="p-3 text-black">{order.payment_method}</td>
                <td className="p-3 text-black">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 bg-success rounded-full text-xs font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-black font-semibold">
                  {order.amount} BDT
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">
                  #{order.order_id}
                </p>

                <span
                  className={`px-2 py-1 text-xs bg-green-300 rounded-full ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {order.payment_method}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </p>

              <p className="mt-2 font-bold text-sky-600">
                {order.amount} BDT
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
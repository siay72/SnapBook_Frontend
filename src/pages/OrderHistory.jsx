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

  return (

    <div className="max-w-3xl mx-auto p-4 bg-white text-black rounded-xl shadow-md mt-6">


      <h2 className="text-xl font-bold mb-4">Order History</h2>

      <table className="table w-full">

        <thead className="bg-gray-100 rounded-tl-xl rounded-tr-xl">
          <tr className="text-left text-gray-600">
            <th>Transaction ID</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>

          {orders?.map(order => (

            <tr key={order.order_id}>

              <td>{order.order_id}</td>

              <td>{order.payment_method}</td>

              <td>{new Date(order.created_at).toLocaleDateString()}</td>

              <td className="text-green-600">{order.status}</td>

              <td>{order.amount} BDT</td>

            </tr>

          ))}
          {orders.length === 0 && (
            <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                No orders found
                </td>
            </tr>
            )}

        </tbody>

      </table>

    </div>

  );

};

export default OrderHistory;
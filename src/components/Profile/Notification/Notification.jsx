import { useEffect, useState } from "react";
import authApiClient from "../../../services/auth-api-client";
import useAuthContext from "../../../hooks/useAuthContext";
import { FiBell } from "react-icons/fi";
import toast from "react-hot-toast";

const Notification = () => {
  const { user } = useAuthContext();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await authApiClient.get("/notifications/");
      const data = res.data;

      setNotifications(data);
      setUnreadCount(data.filter(n => !n.is_read).length);

    } catch (err) {
      console.log("Notification error", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) fetchNotifications();
  }, [user]);

  // 🔹 Auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (user) fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

  // DELETE notification
  const deleteNotification = async (id) => {
    try {
      await authApiClient.delete(`/notifications/${id}/delete/`);

      setNotifications(prev => prev.filter(n => n.id !== id));
      setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));
      toast.success("Notification deleted");

    } catch (err) {
      console.log("Delete error", err);
    }
  };

  // 🔹 Accept friend request
const acceptRequest = async (id, notificationId) => {
  try {
    const res = await authApiClient.get(`/friend-requests/${id}/`);

    if (res.data.status !== "pending") {
      toast.error("Already handled");
      return;
    }

    await authApiClient.post(`/friend-requests/${id}/accept/`);

    toast.success("Friend request accepted");

    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, is_read: true }
          : n
      )
    );

  } catch (err) {
    console.log(err.response?.data);
  }
};

const rejectRequest = async (id, notificationId) => {
  try {
    await authApiClient.post(`/friend-requests/${id}/cancel/`);

    toast.success("Friend request rejected");

    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, status: "rejected", is_read: true }
          : n
      )
    );

  } catch (err) {
    console.log(err);
  }
};



  return (
    <div className="dropdown dropdown-end">

      {/* BUTTON */}
      <label tabIndex={0} className="cursor-pointer relative">
        <FiBell className="text-xl" />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </label>

      {/* 🔽 DROPDOWN */}
      <div
        tabIndex={0}
        className="dropdown-content mt-3 z-10 p-0 shadow bg-white text-black rounded-box w-80 max-h-96 overflow-y-auto"
      >

        {/* Header */}
        <div className="p-3 border-b font-semibold">
          Notifications
        </div>

        {/* Content */}
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`
                flex items-start gap-3 p-3 relative
                transition-all duration-150
                ${!n.is_read ? "bg-blue-50" : "bg-white"}
                hover:bg-gray-100
                border-b border-gray-200
                cursor-pointer
              `}
            >

              {/* Profile */}
              <img
                src={n.sender_profile_picture || "/public/defualt_pic.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt="user"
              />

              <div className="flex-1">

                {/* Message */}
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">{n.sender_name}</span>{" "}
                  {n.message}
                </p>

                {/* Time */}
                <span className="text-xs text-gray-500">
                  {new Date(n.created_at).toLocaleString()}
                </span>

                {/* FRIEND REQUEST ACTIONS */}
                {n.notification_type === "friend_request" && n.request_status === "pending" && (
                <div className="flex gap-2 mt-2">

                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        acceptRequest(n.reference_id, n.id);
                    }}
                    className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                    Accept
                    </button>

                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        rejectRequest(n.reference_id, n.id);
                    }}
                    className="bg-gray-300 text-black text-xs px-3 py-1 rounded-md hover:bg-gray-400"
                    >
                    Reject
                    </button>

                </div>
                )}

                {n.request_status === "accepted" && (
                <p className="text-xs text-green-600 mt-1 font-semibold">
                     Accepted
                </p>
                )}

                {n.request_status === "rejected" && (
                <p className="text-xs text-red-500 mt-1 font-semibold">
                     Rejected
                </p>
                )}

              </div>


              {/* 3 DOT MENU */}
              <div className="absolute top-8 right-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === n.id ? null : n.id);
                  }}
                  className="text-lg px-2 text-gray-600 hover:text-black"
                >
                  ⋮
                </button>

                {openMenuId === n.id && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow w-24 z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(n.id);
                        setOpenMenuId(null);
                      }}
                      className="block w-full text-left px-3 py-1 hover:bg-gray-200 text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Notification;
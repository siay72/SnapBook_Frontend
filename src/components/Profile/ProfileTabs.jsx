import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
import toast from "react-hot-toast";

const ProfileTabs = () => {

  const { id } = useParams();
  const { user } = useAuthContext();

  const [status, setStatus] = useState("none");
  const [friendshipId, setFriendshipId] = useState(null);

  //Fetch friendship status
  const fetchStatus = async () => {
    try {
      if (!id || Number(id) === user?.id) return;

      const res = await authApiClient.get(`/friend-requests/status/${id}/`);

      setStatus(res.data.status);
      setFriendshipId(res.data.friendship_id || null);

    } catch (err) {
      console.log("Status error:", err);
    }
  };

  useEffect(() => {
    if (user) fetchStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  // Send Request
  const sendRequest = async () => {
    try {
      await authApiClient.post("/friend-requests/", {
        receiver: id,
      });

      toast.success("Friend request sent");
      setStatus("request_sent");

    } catch (err) {
      console.log(err);
      toast.error("Failed");
    }
  };

  // UNFRIEND FUNCTION
  const unfriend = async () => {
    try {

      await authApiClient.post(`/friends/${friendshipId}/unfriend/`);

      toast.success("Unfriended");
      setStatus("none");

    } catch (err) {
      console.log(err);
      toast.error("Failed to unfriend");
    }
  };

  return (
    <div className="bg-pink-100 rounded-xl shadow mt-6 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 items-center">

        <button className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg">
          Timeline
        </button>

        <button className="px-3 py-2 hover:bg-blue-100 text-blue-600 rounded-lg">
          About
        </button>

        <button className="px-3 py-2 hover:bg-blue-100 text-blue-600 rounded-lg">
          Friends
        </button>

        <button className="px-3 py-2 hover:bg-blue-100 text-blue-600 rounded-lg">
          Photos
        </button>

        {/* FRIEND SYSTEM */}
        {id && Number(id) !== user?.id && (
          <>
            {status === "none" && (
              <button
                onClick={sendRequest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Friend
              </button>
            )}

            {status === "request_sent" && (
              <button
                disabled
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Request Sent
              </button>
            )}

            {status === "friends" && (
              <button
                onClick={unfriend}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Unfriend
              </button>
            )}

            {status === "request_received" && (
              <button
                disabled
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Respond to Request
              </button>
            )}
          </>
        )}

      </div>

      {/* Search */}
      <input
        placeholder="Search Here..."
        className="w-full md:w-auto border px-3 py-2 text-black bg-amber-200 rounded-lg"
      />

    </div>
  );
};

export default ProfileTabs;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";

const ProfileHeader = () => {

  const { user } = useAuthContext();
  const { id } = useParams(); // 🔥 get profile id from URL

  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        if (id) {
          const res = await authApiClient.get(`/profile/${id}/`);
          setProfileUser(res.data);
        } else {
          setProfileUser(user);
        }
      } catch (err) {
        console.log("Profile fetch error", err);
      }
    };

    fetchProfile();

  }, [id, user]);

  // 🔥 fallback while loading
  if (!profileUser) return null;

  return (
    <div className="relative rounded-xl bg-white overflow-hidden">

      {/* COVER */}
      <img
        src={
          profileUser?.cover_image ||
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
        }
        className="w-full h-72 object-cover mt-2 rounded-xl"
        alt="cover"
      />

      {/* EDIT BUTTON (ONLY OWN PROFILE) */}
      {!id && (
        <button className="absolute right-6 bottom-6 bg-blue-300 px-4 py-2 rounded-lg shadow">
          Edit Cover
        </button>
      )}

      {/* PROFILE CARD */}
      <div className="absolute left-10 top-16 bg-purple-100 rounded-xl shadow-lg p-6 w-72 text-center">

        <img
          src={
            profileUser?.profile_picture ||
            "./public/defualt_pic.png"
          }
          className="w-24 h-24 rounded-full mx-auto border-4 border-white object-cover"
          alt="profile"
        />

        <h2 className="font-bold mt-3 text-blue-500">
          {profileUser?.first_name} {profileUser?.last_name}
        </h2>

        {/* 🔥 REMOVED EMAIL (better UX like Facebook) */}
        <p className="text-gray-500 text-sm mt-1">
          @{profileUser?.first_name?.toLowerCase()}
        </p>

      </div>
    </div>
  );
};

export default ProfileHeader;
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const ProfileSidebar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">

      <img
        src={user?.profile_image || "https://i.pravatar.cc/150"}
        alt="profile"
        className="w-24 h-24 rounded-full mx-auto"
      />

      <h2 className="text-lg text-black font-bold mt-3">
        {user?.first_name} {user?.last_name}
      </h2>


      <p className="text-gray-400 text-xs mt-2">
        Lorem Ipsum is simply dummy text of the printing industry.
      </p>

      <div className="flex justify-around mt-6">

        <div>
          <h3 className="font-bold text-black">546</h3>
          <p className="text-xs text-gray-500">Following</p>
        </div>

        <div>
          <h3 className="font-bold text-black">26335</h3>
          <p className="text-xs text-gray-500">Likes</p>
        </div>

        <div>
          <h3 className="font-bold text-black">6845</h3>
          <p className="text-xs text-gray-500">Followers</p>
        </div>

      </div>

      <button
          onClick={() => navigate("/profile")}
          className="mt-5 bg-sky-600 text-white px-4 py-2 rounded-lg"
        >
        View Profile
      </button>

    </div>
  );
};

export default ProfileSidebar;
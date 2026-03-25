import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const ProfileSidebar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-r from-blue-500 to-purple-500 rounded-xl shadow-md p-6 text-center">

      <Link to="/profile">

        <img
          src={user?.profile_picture || "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-gray-300"
        />  
      </Link>

      <h2 className="text-lg text-black font-bold mt-3">
        {user?.first_name} {user?.last_name}
      </h2>


      <p className="text-white text-xs mt-2 text-semibold">
        HI! My name is {user?.first_name} {user?.last_name}. I lived in {user?.location} and I am a passionate software developer with a love for creating innovative solutions. With a strong background in full-stack development, I enjoy building user-friendly applications that make a difference. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through tech blogs and workshops. Let's connect and create something amazing together!
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
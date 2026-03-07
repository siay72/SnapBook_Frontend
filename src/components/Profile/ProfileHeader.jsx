import useAuthContext from "../../hooks/useAuthContext";

const ProfileHeader = () => {

  const { user } = useAuthContext();

  return (
    <div className="relative rounded-xl bg-white overflow-hidden">

      {/* Cover */}
      <img
        src={user?.cover_image || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"}
        className="w-full h-72 object-cover"
      />

      {/* Edit Cover Button */}
      <button className="absolute right-6 bottom-6 bg-blue-300 px-4 py-2 rounded-lg shadow">
        Edit Cover
      </button>

      {/* Profile Card */}
      <div className="absolute left-10 top-16 bg-purple-100 rounded-xl shadow-lg p-6 w-72 text-center">

        <img
          src={user?.profile_image || "https://i.pravatar.cc/100"}
          className="w-24 h-24 rounded-full mx-auto border-4 border-white"
        />

        <h2 className="font-bold mt-3 text-blue-500">
          {user?.first_name} {user?.last_name}
        </h2>

        <p className="text-gray-500 text-sm inline-block px-2 py-1 rounded mt-1">
          {user?.email}
        </p>

      </div>
    </div>
  );
};

export default ProfileHeader;
import { useEffect, useState } from "react";
import { FiBell, FiHome, FiUser, FiMoon } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import authApiClient from "../services/auth-api-client";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const [totalPosts, setTotalPosts] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await authApiClient.get("/posts/");
        setTotalPosts(response.data.count);
      } catch (error) {
        console.log("Error fetching post count", error);
      }
    };

    fetchPostCount();
  }, []);

  return (
    <div className="w-full bg-sky-600 text-white px-6 py-3 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold">SnapBook</h1>

        <input
          type="text"
          placeholder="Find Friends..."
          className="bg-sky-500 px-4 py-1 rounded-lg outline-none placeholder-white"
        />

        <FiHome 
          onClick={() => navigate("/")}
          className="text-xl cursor-pointer" />
        <FiUser className="text-xl cursor-pointer" />
      </div>

      {/* CENTER */}
      <div className="hidden lg:flex gap-4">

        <div className="bg-sky-500 px-4 py-1 rounded-lg">
          <span className="font-bold">{totalPosts}</span> Total Posts
        </div>

        <div className="bg-sky-500 px-4 py-1 rounded-lg">
          <span className="font-bold">2456</span> Total Friends
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <div className="relative cursor-pointer">
          <FiBell className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
            2
          </span>
        </div>



        {user ? (
          <div className="flex items-center gap-2">

            <img
              src={user.profile_image || "https://i.pravatar.cc/40"}
              className="w-8 h-8 rounded-full"
              alt="avatar"
            />

            <span>{user.first_name || "User"}</span>

            <button
              onClick={logoutUser}
              className="bg-red-500 px-2 py-1 rounded text-xs"
            >
              Logout
            </button>

          </div>
        ) : (
          <>
            <Link className="btn btn-outline btn-sm" to="/login">
              Login
            </Link>

            <Link className="btn btn-secondary btn-sm" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
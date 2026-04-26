import { useEffect, useState } from "react";
import { FiBell, FiHome, FiUser, FiMenu, FiDatabase } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import authApiClient from "../services/auth-api-client";
import { AiFillDashboard } from "react-icons/ai";
import Notification from "../components/Profile/Notification/Notification";

const Navbar = () => {

  const { user, logoutUser } = useAuthContext();
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [totalFriends, setTotalFriends] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchCounts = async () => {

      try {
        // POSTS
        const postRes = await authApiClient.get("/posts/");
        const postData = postRes.data;
        const postCount = postData.count ?? postData.length;
        setTotalPosts(postCount);

        //  FRIENDS
        const friendRes = await authApiClient.get("/friends/");
        const friendData = friendRes.data;

        setTotalFriends(friendData.length);

      } catch (error) {
        console.log("Error fetching counts", error);
      }

    };

    fetchCounts();

  }, []);


  const handleSearch = (value) => {

    setSearchQuery(value);

    if (value) {
      setSearchParams({ search: value });
      navigate(`/?search=${value}`);
    } else {
      setSearchParams({});
      navigate("/");
    }

  };

  return (

    <div className="navbar sticky top-0 z-50 bg-sky-600/90 backdrop-blur-md text-white px-4 shadow-md">

      {/* LEFT */}
      <div className="navbar-start gap-2">

        {/* Drawer Toggle (Mobile Sidebar Button) */}
        <label htmlFor="drawer-toggle" className="btn btn-ghost lg:hidden">
          <FiMenu className="text-xl" />
        </label>

        {/* Logo */}
        <h1
          className="text-xl sm:text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          SnapBook
        </h1>

      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex gap-4">

        <div className="bg-sky-500 px-4 py-1 rounded-lg">
          <span className="font-bold">{totalPosts}</span> Total Posts
        </div>

        <div className="bg-sky-500 px-4 py-1 rounded-lg">
          <span className="font-bold">{totalFriends}</span> Total Friends
        </div>

      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-2 sm:gap-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Find something..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="hidden sm:block bg-sky-500 px-3 py-1 rounded-lg outline-none placeholder-white w-32 md:w-48"
        />

        {/* Notification */}
        <Notification />

        {/* USER */}
        {user ? (

          <div className="dropdown dropdown-end">

            <label tabIndex={0} className="flex items-center gap-2 cursor-pointer">

              <img
                src={user.profile_picture || "/public/defualt_pic.png"}
                className="w-8 h-8 rounded-full"
                alt="avatar"
              />

              <span className="hidden md:block">
                {user.first_name || "User"}
              </span>

            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-10 p-2 shadow bg-white text-black rounded-box w-40"
            >

              <li>
                <Link className="flex gap-2" to="/dashboard">
                  <AiFillDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link className="flex gap-2" to="/profile">
                  <FiUser /> Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutUser}
                  className="text-red-500"
                >
                  Logout
                </button>
              </li>

            </ul>

          </div>

        ) : (

          <div className="flex gap-2">

            <Link className="btn btn-outline btn-sm" to="/login">
              Login
            </Link>

            <Link className="btn btn-secondary btn-sm" to="/register">
              Register
            </Link>

          </div>

        )}

      </div>

    </div>

  );

};

export default Navbar;
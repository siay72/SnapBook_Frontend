import {
  FiHome,
  FiUsers,
  FiImage,
  FiMessageSquare,
  FiSettings,
  FiUser,
  FiLock
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaJediOrder } from "react-icons/fa";

const Sidebar = () => {

  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="drawer-side z-40 ">

      <label htmlFor="drawer-toggle" className="drawer-overlay"></label>

      <aside className="menu bg-base-200 w-64 min-h-full p-4 ">

        <h1 className="text-xl font-bold mb-6">SnapBook</h1>

        <ul className="space-y-2">

          <li>
            <Link to="/dashboard" className="flex items-center gap-3">
              <FiHome /> News Feed
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3">
              <FiUsers /> Friends
            </Link>
          </li>

          <li>
            <Link to="/myposts" className="flex items-center gap-3">
              <FiImage /> My Posts
            </Link>
          </li>

          <li>
            <Link className="flex items-center gap-3">
              <FiMessageSquare /> Messages
            </Link>
          </li>
          <li>
            <Link to="/order-history" className="flex items-center gap-3">
              <FaJediOrder /> Order History
            </Link>
          </li>

          {/* ADMIN ONLY MENU */}
          {user?.is_staff && (
            <li>
              <Link to="/dashboard/users" className="flex items-center gap-3">
                <FiUsers /> Users
              </Link>
            </li>
          )}

          <li>
            <details>
              <summary className="flex items-center gap-3">
                <FiSettings /> Settings
              </summary>

              <ul>

                <li>
                  <Link to="/settings/profile" className="flex items-center gap-2">
                    <FiUser /> Edit Profile
                  </Link>
                </li>

                <li>
                  <Link to="/settings/change-password" className="flex items-center gap-2">
                    <FiLock /> Change Password
                  </Link>
                </li>

              </ul>

            </details>
          </li>

        </ul>

      </aside>
    </div>
  );
};

export default Sidebar;
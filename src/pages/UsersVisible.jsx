import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const UsersVisible = () => {

  const { user, loading } = useAuth();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchUsers = async () => {

    try {

      const res = await authApiClient.get("/auth/users/");
      setUsers(res.data);

    } catch (error) {

      console.error("Error fetching users", error);

    } finally {

      setLoadingUsers(false);

    }

  };

  useEffect(() => {

    if (user?.is_staff) {
      fetchUsers();
    }

  }, [user]);

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      await authApiClient.delete(`/admin/users/${id}/`);

      setUsers(users.filter((u) => u.id !== id));

      toast.success("User deleted successfully");

    } catch (error) {

      console.log("DELETE ERROR:", error.response);

      alert(error.response?.data?.detail || "Failed to delete user");

    }

  };

  if (loading || loadingUsers) {
    return (
      <div className="p-6">
        <p>Loading users...</p>
      </div>
    );
  }

  if (!user?.is_staff) {
    return (
      <div className="p-6 text-red-500 font-bold">
        Access Denied (Admin only)
      </div>
    );
  }

  return (

    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md text-black">

      <h2 className="text-2xl font-bold mb-6">
        All Users
      </h2>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">

        <table className="table w-full">

          <thead className="bg-gray-100">
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((u) => (

              <tr key={u.id}>

                <td>{u.id}</td>

                <td>
                  <img
                    src={u.profile_picture}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>

                <td>
                  {u.first_name} {u.last_name}
                </td>

                <td>{u.email}</td>

                <td>{u.location}</td>

                <td className="flex gap-2">

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>

                  <button className="btn btn-sm btn-info">
                    View Posts
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">

        {users.map((u) => (

          <div
            key={u.id}
            className="bg-white shadow rounded-xl p-4 flex flex-col gap-3"
          >

            <div className="flex items-center gap-3">

              <img
                src={u.profile_picture}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />

              <div>

                <p className="font-semibold text-black">
                  {u.first_name} {u.last_name}
                </p>

                <p className="text-sm text-gray-500">
                  {u.email}
                </p>

              </div>

            </div>

            <p className="text-sm text-gray-600">
               Location: {u.location}
            </p>

            <div className="flex gap-2">

              <button
                className="btn btn-sm btn-error flex-1"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>

              <button className="btn btn-sm btn-info flex-1">
                View Posts
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default UsersVisible;
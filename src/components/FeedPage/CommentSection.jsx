import { useEffect, useState } from "react";
import apiClients from "../../services/auth-api-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

const CommentSection = ({ postId, setPosts, }) => {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const authTokens = JSON.parse(localStorage.getItem("authTokens") || "{}");
  // const user = JSON.parse(localStorage.getItem("user") || "{}");

  const token = authTokens?.access;

  const decoded = token ? jwtDecode(token) : null;

  const loggedUserId = Number(decoded?.user_id);
  const isStaffUser = decoded?.is_staff === true;

  console.log("isStaffUser:", isStaffUser);


  useEffect(() => {

    const fetchComments = async () => {

      try {

        const res = await apiClients.get(`/my-posts/${postId}/comments/`);
        const data = res.data.results || res.data;

        setComments(data);

        setPosts(prev =>
          prev.map(p =>
            p.id === postId
              ? { ...p, total_comments: data.length }
              : p
          )
        );

      } catch (err) {
        console.log(err);
      }

    };

    fetchComments();

  }, [postId, setPosts]);


  // CREATE COMMENT
  const handleSubmit = async () => {

    if (!text.trim()) return;

    setPostLoading(true);

    try {

      const res = await apiClients.post(`/posts/${postId}/comments/`, { text });

      setComments(prev => [res.data, ...prev]);

      setText("");

    } catch (err) {

      console.log(err);

    } finally {
      toast.success("Comment Posted Successfully.");
      setPostLoading(false);

    }

  };


  // DELETE COMMENT
  const confirmDelete = async () => {
    setDeleteLoading(true);

    try {
      await apiClients.delete(`/my-posts/${postId}/comments/${deleteId}/`);

      setComments(prev => prev.filter(c => c.id !== deleteId));
      setDeleteId(null);

    } catch (err) {

      if (err.response?.status === 403) {
        toast.error("You cannot delete another user's comment");
      } else {
        toast.error("Something went wrong while deleting.");
      }

    } finally {
      toast.success("Comment Deleted Successfully.");
      setDeleteLoading(false);
    }
  };


  // EDIT COMMENT
  const saveEdit = async (id) => {
    try {

      const res = await apiClients.patch(
        `/my-posts/${postId}/comments/${id}/`,
        { text: editingText }
      );

      setComments(prev =>
        prev.map(c => (c.id === id ? res.data : c))
      );
      toast("Saving...", { icon: "⏳" });
      setEditingId(null);

    } catch (err) {

      if (err.response?.status === 403) {
        toast.error("You cannot edit another user's comment.");
      } else {
        toast.error("Something went wrong while editing.");
      }

    }
  };


  return (

    <div className="mt-4">

      {/* COMMENT INPUT */}
      <div className="flex gap-2 mb-4">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded p-2 text-sm text-black"
        />

        <button
          onClick={handleSubmit}
          disabled={postLoading}
          className={`px-4 py-2 rounded text-sm text-white ${
            postLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {postLoading ? "Posting..." : "Post"}
        </button>

      </div>


      {/* COMMENT LIST */}
      <div className="space-y-4">

        {comments.map(comment => (

          <div key={comment.id} className="flex gap-3">

            <img
              src={comment.user_profile_picture || "https://i.pravatar.cc/40"}
              className="w-8 h-8 rounded-full"
            />

            <div className="bg-gray-100 px-3 py-2 rounded-lg w-full relative">

              <div className="flex justify-between">

                <div>

                  <p className="font-semibold text-sm text-black">
                    {comment.user_first_name} {comment.user_last_name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {dayjs(comment.created_at).fromNow()}
                  </p>

                </div>


                {/* 3 DOT MENU */}
                {loggedUserId && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === comment.id ? null : comment.id)
                      }
                      className="text-lg px-2 text-black"
                    >
                      ⋮
                    </button>

                    {openMenuId === comment.id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow w-24 z-50">
                        <button
                          onClick={() => {
                            setEditingId(comment.id);
                            setEditingText(comment.text);
                            setOpenMenuId(null);
                          }}
                          className="block w-full text-left px-3 py-1 text-blue-500 hover:bg-gray-100 text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setDeleteId(comment.id);
                            setOpenMenuId(null);
                          }}
                          className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-red-500 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>


              {/* EDIT MODE */}
              {editingId === comment.id ? (

                <div className="flex gap-2 mt-2">

                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border rounded p-1 flex-1 text-sm text-black"
                  />

                  <button
                    onClick={() => saveEdit(comment.id)}
                    className="text-green-600 text-xs"
                    
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 text-xs"
                  >
                    Cancel
                  </button>

                </div>

              ) : (

                <p className="text-sm text-gray-800 mt-1">
                  {comment.text}
                </p>

              )}

            </div>

          </div>

        ))}

      </div>


        {/* DELETE MODAL */}
        {deleteId && (
          <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">

            <div className="bg-white border rounded-lg shadow-lg p-5 w-64 text-center">

              <p className="text-sm text-gray-700 mb-4">
                Delete this comment?
              </p>

              <div className="flex justify-center gap-3">

                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="border px-3 py-1 rounded text-sm bg-primary text-white hover:bg-green-600"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )}
    </div>

  );

};

export default CommentSection;
import { useState } from "react";
import CommentSection from "./CommentSection";
import apiClients from "../../services/auth-api-client";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";


const PostCard = ({ post, setPosts }) => {
  

  const [showComments, setShowComments] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingCaption, setEditingCaption] = useState(post.caption);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  const { user, loading } = useAuth();

  if (loading) return null;

  const canModifyPost =
    user && (user.is_staff || user.id === post.user_id);



  
  // --------------------------
  // Like post
  // --------------------------
  const handleLike = async () => {

    try {

      await apiClients.post(`/posts/${post.id}/like/`);

      setPosts(prevPosts =>
        prevPosts.map(p =>
          p.id === post.id
            ? {
                ...p,
                total_likes: (p.total_likes || 0) + 1,
                total_unlike: p.is_unliked ? p.total_unlike - 1 : p.total_unlike,
                is_liked: true,
                is_unliked: false
              }
            : p
        )
      );

    } catch (error) {
      console.log("Like error", error);
    }

  };

  // --------------------------
  // Unlike post
  // --------------------------
  const handleUnlike = async () => {

    try {

      await apiClients.post(`/posts/${post.id}/unlike/`);

      setPosts(prevPosts =>
        prevPosts.map(p =>
          p.id === post.id
            ? {
                ...p,
                total_unlike: (p.total_unlike || 0) + 1,
                total_likes: p.is_liked ? p.total_likes - 1 : p.total_likes,
                is_unliked: true,
                is_liked: false
              }
            : p
        )
      );

    } catch (error) {
      console.log("Unlike error", error);
    }

  };

  // --------------------------
  // Delete Post
  // --------------------------
  const confirmDeletePost = async () => {

    setDeleteLoading(true);

    try {

      await apiClients.delete(`/posts/${post.id}/`);

      setPosts(prev => prev.filter(p => p.id !== post.id));

      toast.success("Post deleted successfully");

    } catch (error) {
      console.log("Delete post error", error);

      toast.error("Failed to delete post");

    } finally {

      setDeleteLoading(false);
      setDeleteId(null);

    }

  };

  // --------------------------
  // Edit Post
  // --------------------------
  const saveEditPost = async () => {
    try {

      const res = await apiClients.patch(`/posts/${post.id}/`, {
        caption: editingCaption
      });

      setPosts(prev =>
        prev.map(p =>
          p.id === post.id ? res.data : p
        )
      );

      toast.success("Post updated successfully");
      setEditingId(null);

    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Failed to update post");
    }
  };

  return (

    <div className="bg-white shadow rounded-xl p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">

        <div className="flex items-center gap-3">

          <img
            src={post.user_profile_picture || "https://i.pravatar.cc/40"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>

            <h2 className="font-semibold text-black">
              {post.user_first_name} {post.user_last_name}
            </h2>

            <p className="text-xs text-gray-600">
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })} •{" "}
              {new Date(post.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

          </div>

        </div>

        {/* 3 DOT MENU */}
        {canModifyPost && (

          <div className="relative">

            <button
              onClick={() =>
                setOpenMenuId(openMenuId === post.id ? null : post.id)
              }
              className="text-lg px-2 text-black"
            >
              ⋮
            </button>

            {openMenuId === post.id && (

              <div className="absolute right-0 mt-2 bg-white border rounded shadow w-24 z-50">

                <button
                  onClick={() => {
                    setEditingId(post.id);
                    setOpenMenuId(null);
                  }}
                  className="block w-full text-left px-3 py-1 text-blue-500 hover:bg-gray-100 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setDeleteId(post.id);
                    setOpenMenuId(null);
                  }}
                  className="block w-full text-left px-3 py-1 text-red-500 hover:bg-gray-100 text-sm"
                >
                  Delete
                </button>

              </div>

            )}

          </div>

        )}

      </div>

      {/* Caption */}
      {editingId === post.id ? (

        <div className="flex gap-2 mb-3">

          <input
            value={editingCaption}
            onChange={(e) => setEditingCaption(e.target.value)}
            className="border rounded p-2 flex-1 text-black"
          />

          <button
            onClick={saveEditPost}
            className="text-green-600 text-sm"
          >
            Save
          </button>

          <button
            onClick={() => setEditingId(null)}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>

        </div>

      ) : (

        <p className="text-gray-700 mb-3">
          {post.caption}
        </p>

      )}

      {/* Image */}
      {post.image && (

        <img
          src={post.image}
          alt="post"
          className="w-full rounded-lg mb-3"
        />

      )}

      {/* Video */}
      {post.video_url && (

        <a
          href={post.video_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 block mb-3"
        >
          Watch Video
        </a>

      )}

      {/* Reactions */}
      <div className="flex gap-6 mt-3 text-sm">

        <button
          onClick={handleLike}
          disabled={post.is_liked}
          className={`flex items-center gap-1 ${
            post.is_liked
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600"
          }`}
        >
          👍 Like {post.total_likes || 0}
        </button>

        <button
          onClick={handleUnlike}
          disabled={post.is_unliked}
          className={`flex items-center gap-1 ${
            post.is_unliked
              ? "text-gray-400 cursor-not-allowed"
              : "text-red-500"
          }`}
        >
          👎 Unlike {post.total_unlike || 0}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-500"
        >
          💬 {post.comments_count || post.total_comments || 0} Comments
        </button>

      </div>

      {/* Comment Section */}
      {showComments && (

        <CommentSection
          postId={post.id}
          setPosts={setPosts}
        />

      )}

      {/* DELETE MODAL */}
      {deleteId && (

        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">

          <div className="bg-white border rounded-lg shadow-lg p-5 w-64 text-center">

            <p className="text-sm text-gray-700 mb-4">
              Delete this post?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={confirmDeletePost}
                disabled={deleteLoading}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="border px-3 py-1 rounded text-sm"
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

export default PostCard;
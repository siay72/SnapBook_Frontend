import { useState } from "react";
import CommentSection from "./CommentSection";
import apiClients from "../../services/auth-api-client";

const PostCard = ({ post, setPosts }) => {

  const [showComments, setShowComments] = useState(false);

  // Like post
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

  // Unlike post
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

  return (

    <div className="bg-white shadow rounded-xl p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">

        <img
          src={post.user_profile_image || "https://i.pravatar.cc/40"}
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

      {/* Caption */}
      <p className="text-gray-700 mb-3">
        {post.caption}
      </p>

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

    </div>

  );
};

export default PostCard;


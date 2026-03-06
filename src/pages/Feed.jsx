import { useEffect, useState } from "react";
import apiClients from "../services/auth-api-client";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await apiClients.get("/posts/");
      setPosts(response.data.results);
    } catch (error) {
      console.log("Error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">News Feed</h1>

      <div className="space-y-6 max-w-2xl mx-auto">

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <h2 className="font-semibold text-lg">
              {post.user_email}
            </h2>

            <p className="text-gray-600 mt-2">
              {post.caption}
            </p>

            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="mt-3 rounded-lg"
              />
            )}

            {post.video_url && (
              <a
                href={post.video_url}
                target="_blank"
                className="text-blue-500 block mt-2"
              >
                Watch Video
              </a>
            )}

            <div className="flex gap-4 mt-4 text-sm text-gray-500">
              <span>👍 {post.total_likes}</span>
              <span>👎 {post.total_unlike}</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Feed;
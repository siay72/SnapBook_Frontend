import { useEffect, useState } from "react";
import apiClients from "../../services/auth-api-client";
import CreatePost from "../FeedPage/CreatePost";
import PostCard from "../FeedPage/PostCard";

const ProfileFeeds = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        // fetch only logged in user's posts
        const response = await apiClients.get("/my-posts/");

        setPosts(response.data.results || response.data);

      } catch (error) {

        console.log("Error fetching profile posts", error);

      } finally {

        setLoading(false);

      }

    };

    fetchPosts();

  }, []);

  return (

    <div className="space-y-6 max-w-2xl mx-auto">

      <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />

      {loading ? (

        <div className="flex justify-center py-10">

          <span className="loading loading-spinner loading-lg text-primary"></span>

        </div>

      ) : posts.length === 0 ? (

        <p className="text-center text-gray-500 py-10">
          No posts yet
        </p>

      ) : (

        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            setPosts={setPosts}
          />
        ))

      )}

    </div>

  );
};

export default ProfileFeeds;
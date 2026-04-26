import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
import CreatePost from "../FeedPage/CreatePost";
import PostCard from "../FeedPage/PostCard";

const ProfileFeeds = () => {

  const { id } = useParams();
  const { user } = useAuthContext(); 

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPosts = async () => {
      try {

        const userId = id || user?.id;

        if (!userId) return;

        const res = await authApiClient.get(`/posts/?user_id=${userId}`);
        const data = res.data.results || res.data;

        setPosts(data);

      } catch (err) {
        console.log("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

  }, [id, user]);

  //  Loading
  if (loading) {
    return <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
  }

  //  Empty
  if (posts.length === 0) {
    return <p className="text-center text-gray-400">No posts yet 🚀</p>;
  }

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
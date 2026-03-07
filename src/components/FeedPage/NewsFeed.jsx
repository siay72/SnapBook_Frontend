import { useEffect, useState } from "react";
import apiClients from "../../services/auth-api-client";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

const NewsFeed = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response = await apiClients.get("/posts/");
        setPosts(response.data.results);

      } catch (error) {
        console.log("Error fetching posts", error);

      } finally {
        setLoading(false);
      }

    };

    fetchPosts();

  }, []);

  return (

    <div className="space-y-6 max-w-2xl mx-auto">

      <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />

      {/* DaisyUI Loading */}
      {loading ? (

        <div className="flex justify-center py-10">

          <span className="loading loading-spinner loading-lg text-primary"></span>

        </div>

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

export default NewsFeed;
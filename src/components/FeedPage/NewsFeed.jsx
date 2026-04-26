import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClients from "../../services/auth-api-client";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

const NewsFeed = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const fetchPosts = async () => {

  setLoading(true);

  try {

    const url = searchQuery
      ? `/posts/?search=${searchQuery}`
      : `/posts/`;

    const response = await apiClients.get(url);

    setPosts(Array.isArray(response.data)
    ? response.data
    : response.data.results || []);

  } catch (error) {

    console.log("Error fetching posts", error);

  } finally {

    setLoading(false);

  }

};

  useEffect(() => {

    fetchPosts();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (

    <div className="space-y-6 max-w-2xl mx-auto">

      <CreatePost
        onPostCreated={(newPost) => setPosts(prev => [newPost, ...prev])}
      />

      {/* DaisyUI Loading */}
      {loading ? (

        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>

      ) : posts.length === 0 ? (

        <p className="text-center text-gray-500">
          No posts found
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

export default NewsFeed;
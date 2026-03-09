import { useState } from "react";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuthContext();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!caption && !image) return;

    const formData = new FormData();
    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const response = await authApiClient.post("/posts/", formData);

      setCaption("");
      setImage(null);
     

      // refresh feed
      if (onPostCreated) {
        onPostCreated(response.data);
      }
      toast.success("Post created successfully!");
    } catch (error) {
      console.log("Error creating post", error);
      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h1 className="text-xl font-bold text-black mb-2">Create Post</h1>
      {/* User info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={user?.profile_picture || "https://i.pravatar.cc/40"}
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-full cursor-pointer"
        />

        <input
          type="text"
          placeholder="Write something here..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="flex-1 bg-gray-100 text-black rounded-full px-4 py-2 outline-none"
        />
      </div>

      {/* Upload section */}
      <div className="flex items-center justify-between mt-3">

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
            className="text-sm text-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg"
        
          
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </div>

    </div>
  );
};

export default CreatePost;
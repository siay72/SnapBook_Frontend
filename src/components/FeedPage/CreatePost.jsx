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
      <h1 className="text-lg md:text-xl font-bold text-black mb-2">
        Create Post
      </h1>

      {/* User + Input */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">

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
          className="w-full flex-1 bg-gray-100 text-black rounded-full px-4 py-2 outline-none text-sm md:text-base"
        />
      </div>

      {/* Upload + Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="text-sm text-blue-500 w-full sm:w-auto"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto bg-sky-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </div>
    </div>
  );
};

export default CreatePost;
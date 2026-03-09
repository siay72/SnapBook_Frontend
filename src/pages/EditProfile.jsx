import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ErrorAlert from "../components/ErrorAlert";

const EditProfile = () => {

  const { user, updateUserProfile, errorMsg } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Load user data
  useEffect(() => {

    if (user) {

      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        location: user.location,
        phone_number: user.phone_number
      });

      setPreview(user.profile_picture || null);

    }

  }, [user, reset]);

  // Submit form
  const onSubmit = async (data) => {

    setLoading(true);

    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("location", data.location || "");
    formData.append("phone_number", data.phone_number || "");

    // IMPORTANT: ensure file exists
    if (data.profile_picture && data.profile_picture[0]) {
      formData.append("profile_picture", data.profile_picture[0]);
    }

    const response = await updateUserProfile(formData);

    if (response?.success) {

      toast.success("Profile updated successfully");

      if (response.data?.profile_picture) {
        // eslint-disable-next-line react-hooks/purity
        setPreview(`${response.data.profile_picture}?v=${Date.now()}`);
      }

    }

    setLoading(false);

  };

  // Image preview before upload
  const handleImagePreview = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

  };

  return (

    <div
      className="flex min-h-screen items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-image.png')" }}
    >

      <div className="bg-linear-to-r from-pink-300 to-purple-300 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md">

        <div className="card-body">

          {errorMsg && <ErrorAlert error={errorMsg} />}

          <h2 className="text-4xl font-bold mb-2 text-black">
            Edit Profile
          </h2>

          <p className="text-gray-600 mb-6">
            Update your personal information
          </p>

          {/* Profile Image */}
          <div className="flex justify-center mb-4">

            <img
              src={preview || "https://i.pravatar.cc/150"}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border"
            />

          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Upload Image */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Profile Picture
                </span>
              </label>

              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("profile_picture", {
                  onChange: (e) => handleImagePreview(e)
                })}
              />

            </div>

            {/* First Name */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  First Name
                </span>
              </label>

              <input
                type="text"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("first_name", {
                  required: "First Name is required"
                })}
              />

              {errors.first_name && (
                <span className="text-red-500 text-sm">
                  {errors.first_name.message}
                </span>
              )}

            </div>

            {/* Last Name */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Last Name
                </span>
              </label>

              <input
                type="text"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("last_name", {
                  required: "Last Name is required"
                })}
              />

              {errors.last_name && (
                <span className="text-red-500 text-sm">
                  {errors.last_name.message}
                </span>
              )}

            </div>

            {/* Email */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Email
                </span>
              </label>

              <input
                type="email"
                readOnly
                className="bg-gray-300 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("email")}
              />

            </div>

            {/* Location */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Location
                </span>
              </label>

              <select
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("location")}
              >
                <option value="">Select Location</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Barisal">Barisal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>

            </div>

            {/* Phone */}
            <div className="form-control">

              <label className="label">
                <span className="text-sm text-black font-medium">
                  Phone Number
                </span>
              </label>

              <input
                type="text"
                className="bg-amber-500 border rounded-lg mt-1 p-2 w-full text-black"
                {...register("phone_number")}
              />

            </div>

            <button className="btn btn-primary w-full">
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default EditProfile;
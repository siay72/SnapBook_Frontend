import { FiBriefcase, FiMapPin, FiHeart } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { GiDrop } from "react-icons/gi";

const ProfileAbout = () => {
  return (
    <div className="bg-linear-to-r from-pink-400 to-blue-500 rounded-xl shadow p-6 text-white">

      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">About</h2>

        <button className="bg-white text-gray-600 p-2 rounded-full">
          ✏️
        </button>
      </div>

      <p className="text-sm opacity-90 mb-6">
        Intro My Self
      </p>

      {/* About Items */}
      <div className="space-y-5 text-sm">

        <div className="flex items-start gap-3">
          <FiBriefcase className="text-xl mt-1" />
          <div>
            <p className="font-medium">UX Designer At Google</p>
            <p className="opacity-80">Banglore - 2019</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaGraduationCap className="text-xl mt-1" />
          <div>
            <p className="font-medium">Studied Computer Science</p>
            <p className="opacity-80">At London University</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiHeart className="text-xl mt-1" />
          <div>
            <p className="font-medium">Relationship Status</p>
            <p className="opacity-80">Single</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiMapPin className="text-xl mt-1" />
          <div>
            <p className="font-medium">Lives in London</p>
            <p className="opacity-80">Last 5 Years</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <GiDrop className="text-xl mt-1" />
          <div>
            <p className="font-medium">Blood Group</p>
            <p className="opacity-80">O+</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileAbout;
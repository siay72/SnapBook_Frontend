import ProfileAbout from "../components/Profile/ProfileAbout";
import RightSidebar from "../components/FeedPage/RightSidebar";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileTabs from "../components/Profile/ProfileTabs";
import ProfileFeeds from "../components/Profile/ProfileFeeds";

const Profile = () => {


  return (
    <div className="max-w-7xl bg-white mx-auto mt-6 px-4">

      {/* Cover */}
      <ProfileHeader />

      {/* Tabs */}
      <ProfileTabs />

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6 mt-6">

        {/* LEFT */}
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-24">
            <ProfileAbout />
          </div>
        </div>

        {/* FEED */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-semibold text-lg text-black mb-4">
              Timeline Posts
            </h2>


              <ProfileFeeds />
   

          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-24 space-y-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold text-black">
                Activity Feed
              </h2>
            </div>

            <RightSidebar />

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
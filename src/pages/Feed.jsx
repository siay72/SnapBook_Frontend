import NewsFeed from "../components/FeedPage/NewsFeed";
import RightSidebar from "../components/FeedPage/RightSidebar";
import ProfileSidebar from "../components/FeedPage/ProfileSidebar";
import SubscriptionBanner from "../components/FeedPage/SubscriptionBanner";

const Feed = () => {
  


  return (

    <div className="max-w-7xl bg-white mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow">

      {/* PREMIUM SUBSCRIPTION HEADER */}
      <SubscriptionBanner />

  <div className="grid grid-cols-12 gap-6">

    {/* LEFT SIDEBAR */}
    <div className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24">
        <ProfileSidebar />
      </div>
    </div>

    {/* MAIN FEED */}
    <div className="col-span-12 lg:col-span-6 mt-4">
      <NewsFeed />
    </div>

    {/* RIGHT SIDEBAR */}
    <div className="hidden lg:block lg:col-span-3">
        <div className="sticky top-24">
            <RightSidebar />
        </div>
    </div>

  </div>

</div>





    
  );
};

export default Feed;
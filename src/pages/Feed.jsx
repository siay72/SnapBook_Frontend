import NewsFeed from "../components/FeedPage/NewsFeed";
import RightSidebar from "../components/FeedPage/RightSidebar";
import ProfileSidebar from "../components/FeedPage/ProfileSidebar";

const Feed = () => {
  


  return (

    <div className="max-w-7xl bg-white mx-auto px-4 mt-6">

  <div className="grid grid-cols-12 gap-6">

    {/* LEFT SIDEBAR */}
    <div className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24">
        <ProfileSidebar />
      </div>
    </div>

    {/* MAIN FEED */}
    <div className="col-span-12 lg:col-span-6">
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
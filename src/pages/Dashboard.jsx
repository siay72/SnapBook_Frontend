
import NewsFeed from "../components/FeedPage/NewsFeed";

export default function Dashboard() {

  return (

    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">

      <h2 className="text-3xl font-bold text-center text-black mb-6">
        News Feed
      </h2>

      <NewsFeed />

    </div>

  );

}
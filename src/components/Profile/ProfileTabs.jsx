const ProfileTabs = () => {
  return (
    <div className="bg-pink-100 rounded-xl shadow mt-6 p-4 flex items-center justify-between">

      <div className="flex gap-4">

        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
          Timeline
        </button>

        <button className="px-4 py-2 hover:bg-blue-100 text-blue-600 rounded-lg">
          About 
        </button> 
 
        <button className="px-4 py-2 hover:bg-blue-100 text-blue-600 rounded-lg">
          Friends 
        </button> 
 
        <button className="px-4 py-2 hover:bg-blue-100 text-blue-600 rounded-lg">
          Photos
        </button>

      </div>

      <input
        placeholder="Search Here..."
        className="border px-3 py-1 text-black bg-amber-200 rounded-lg"
      />

    </div>
  );
};

export default ProfileTabs;
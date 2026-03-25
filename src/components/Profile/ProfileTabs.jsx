const ProfileTabs = () => {
  return (
    <div className="bg-pink-100 rounded-xl shadow mt-6 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4">

        <button className="px-3 md:px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm md:text-base">
          Timeline
        </button>

        <button className="px-3 md:px-4 py-2 hover:bg-blue-100 text-blue-600 rounded-lg text-sm md:text-base">
          About 
        </button> 
 
        <button className="px-3 md:px-4 py-2 hover:bg-blue-100 text-blue-600 rounded-lg text-sm md:text-base">
          Friends 
        </button> 
 
        <button className="px-3 md:px-4 py-2 hover:bg-blue-100 text-blue-600 rounded-lg text-sm md:text-base">
          Photos
        </button>

      </div>

      {/* Search */}
      <input
        placeholder="Search Here..."
        className="w-full md:w-auto border px-3 py-2 text-black bg-amber-200 rounded-lg"
      />

    </div>
  );
};

export default ProfileTabs;
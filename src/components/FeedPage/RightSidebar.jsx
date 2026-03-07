const RightSidebar = () => {
  return (
    <div className="space-y-6">

      {/* Birthday Card */}
      <div className="bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-xl p-6 shadow-lg">

        <h2 className="font-bold text-lg mb-2">
          Birthday !!!!
        </h2>

        <p className="text-sm mb-4">
          Today Your College Friend's Birthday
        </p>

        <div className="flex items-center gap-4">

          <img
            src="https://i.pravatar.cc/60"
            className="w-14 h-14 rounded-full border-2 border-white"
          />

          <div>
            <h3 className="font-semibold">Sufiya Elija</h3>
            <p className="text-xs">Glasgow, Scotland</p>
          </div>

        </div>

        <button className="mt-5 w-full bg-white text-pink-500 font-semibold py-2 rounded-lg">
          Wish Birthday
        </button>

      </div>

      {/* Example Future Widget */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3 text-black">Gallery</h3>
        <div className="grid grid-cols-3 gap-2">
          <img src="https://picsum.photos/100" className="rounded-lg" />
          <img src="https://picsum.photos/101" className="rounded-lg" />
          <img src="https://picsum.photos/102" className="rounded-lg" />
        </div>
      </div>

    </div>
  );
};

export default RightSidebar;
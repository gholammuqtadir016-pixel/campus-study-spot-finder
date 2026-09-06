export default function SearchBar() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex items-center bg-white border rounded-xl shadow-sm p-2">

        {/* Search Icon */}
        <div className="px-3 text-xl">
          🔍
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a study spot..."
          className="flex-1 px-2 py-3 outline-none text-slate-700"
        />

        {/* Search Button */}
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Search
        </button>

      </div>
    </div>
  );
}
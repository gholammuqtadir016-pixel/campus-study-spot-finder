export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white border-b">

      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          StudySpot
        </h1>

        <p className="text-xs text-slate-500">
          Find your perfect study space
        </p>
      </div>

      <div className="flex items-center gap-6 text-sm font-medium">

        <a href="/" className="hover:text-blue-600">
          Home
        </a>

        <a href="/spots" className="hover:text-blue-600">
          Study Spots
        </a>

        <a href="#about" className="hover:text-blue-600">
          About
        </a>

        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Login
        </button>

      </div>

    </nav>
  );
}
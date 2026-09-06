"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudyMap from "@/components/StudyMap";
import StudySpotCard from "@/components/StudySpotCard";

interface StudySpot {
  id: number;
  name: string;
  description: string | null;
  icon: string;
  latitude: number;
  longitude: number;
  distance: string | null;
  rating: number;
  wifi: boolean;
  powerOutlets: boolean;
  quiet: boolean;
  seating: string | null;
  crowdLevel: string | null;
  openingHours: string | null;
}

export default function SpotsPage() {
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [crowdFilter, setCrowdFilter] = useState("All");
  const [wifiOnly, setWifiOnly] = useState(false);
  const [powerOnly, setPowerOnly] = useState(false);
  const [quietOnly, setQuietOnly] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSpots() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/study-spots", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch study spots");
      }

      const data = await response.json();
      setSpots(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load study spots. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSpots();
  }, []);

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        spot.name.toLowerCase().includes(searchText) ||
        spot.description?.toLowerCase().includes(searchText) ||
        spot.seating?.toLowerCase().includes(searchText);

      const matchesRating =
        spot.rating >= Number(ratingFilter);

      const matchesCrowd =
        crowdFilter === "All" ||
        spot.crowdLevel === crowdFilter;

      const matchesWifi =
        !wifiOnly || spot.wifi;

      const matchesPower =
        !powerOnly || spot.powerOutlets;

      const matchesQuiet =
        !quietOnly || spot.quiet;

      return (
        matchesSearch &&
        matchesRating &&
        matchesCrowd &&
        matchesWifi &&
        matchesPower &&
        matchesQuiet
      );
    });
  }, [
    spots,
    search,
    ratingFilter,
    crowdFilter,
    wifiOnly,
    powerOnly,
    quietOnly,
  ]);

  function clearFilters() {
    setSearch("");
    setRatingFilter("0");
    setCrowdFilter("All");
    setWifiOnly(false);
    setPowerOnly(false);
    setQuietOnly(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold text-blue-600">
              CAMPUS STUDY SPOT FINDER
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Find Your Perfect Study Spot
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Discover libraries, cafés, study rooms and quiet spaces
              around your campus.
            </p>
          </div>

          <Link
            href="/add-spot"
            className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Study Spot
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Search study spots
          </label>

          <input
            type="text"
            placeholder="Search by name, description or seating..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* Filters */}
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Minimum Rating
              </label>

              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option value="0">Any rating</option>
                <option value="3">3+ ⭐</option>
                <option value="4">4+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Crowd Level
              </label>

              <select
                value={crowdFilter}
                onChange={(e) => setCrowdFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option value="All">Any crowd level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                checked={wifiOnly}
                onChange={(e) => setWifiOnly(e.target.checked)}
                className="h-5 w-5"
              />
              <span className="font-medium">
                📶 Wi-Fi
              </span>
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                checked={powerOnly}
                onChange={(e) => setPowerOnly(e.target.checked)}
                className="h-5 w-5"
              />
              <span className="font-medium">
                🔌 Power
              </span>
            </label>

          </div>

          <div className="mt-4 flex flex-wrap gap-3">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={quietOnly}
                onChange={(e) => setQuietOnly(e.target.checked)}
                className="h-5 w-5"
              />
              🤫 Quiet only
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>

          </div>
        </div>

        {/* Results count */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Study Spots
          </h2>

          <p className="text-sm text-slate-500">
            {filteredSpots.length} result
            {filteredSpots.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-6 rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">
              Loading study spots...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>

            <button
              onClick={loadSpots}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Map */}
        {!loading && !error && filteredSpots.length > 0 && (
          <section className="mt-6">
            <div className="mb-3">
              <h2 className="text-xl font-bold">
                Map View
              </h2>

              <p className="text-sm text-slate-500">
                Click a marker to see study spot details.
              </p>
            </div>

            <StudyMap spots={filteredSpots} />
          </section>
        )}

        {/* Cards */}
        {!loading && !error && filteredSpots.length > 0 && (
          <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSpots.map((spot) => (
              <StudySpotCard
                key={spot.id}
                id={spot.id}
                icon={spot.icon}
                name={spot.name}
                distance={spot.distance ?? "Distance unavailable"}
                rating={spot.rating}
                features={[
                  ...(spot.wifi ? ["📶 Wi-Fi"] : []),
                  ...(spot.powerOutlets ? ["🔌 Power"] : []),
                  ...(spot.quiet ? ["🤫 Quiet"] : []),
                  ...(spot.seating ? [`🪑 ${spot.seating}`] : []),
                  ...(spot.crowdLevel
                    ? [`👥 ${spot.crowdLevel}`]
                    : []),
                ]}
              />
            ))}
          </section>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredSpots.length === 0 && (
            <div className="mt-8 rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
              <div className="text-5xl">🔎</div>

              <h3 className="mt-4 text-xl font-bold">
                No study spots found
              </h3>

              <p className="mt-2 text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}

      </main>

      <Footer />
    </div>
  );
}
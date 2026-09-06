"use client";

import { FormEvent, useState } from "react";

export default function AddSpotPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "📚",
    latitude: "",
    longitude: "",
    distance: "",
    rating: "",
    wifi: false,
    powerOutlets: false,
    quiet: false,
    seating: "",
    crowdLevel: "",
    openingHours: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/study-spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add study spot");
      }

      setMessage("✅ Study spot added successfully!");

      setFormData({
        name: "",
        description: "",
        icon: "📚",
        latitude: "",
        longitude: "",
        distance: "",
        rating: "",
        wifi: false,
        powerOutlets: false,
        quiet: false,
        seating: "",
        crowdLevel: "",
        openingHours: "",
      });
    } catch (error) {
      setMessage(
        `❌ ${error instanceof Error ? error.message : "Something went wrong"}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <a
            href="/spots"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Study Spots
          </a>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Add a Study Spot
          </h1>

          <p className="mt-2 text-slate-600">
            Help other students discover a great place to study.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
        >
          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Basic Information
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Spot Name *
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Central Library"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this study spot..."
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Icon
                </label>

                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                >
                  <option value="📚">📚 Library</option>
                  <option value="☕">☕ Café</option>
                  <option value="💻">💻 Computer Lab</option>
                  <option value="🌳">🌳 Garden</option>
                  <option value="🏢">🏢 Building</option>
                  <option value="🧑‍💻">🧑‍💻 Study Room</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Location
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Latitude *
                </label>

                <input
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="22.5726"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Longitude *
                </label>

                <input
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="88.3639"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Distance from Campus
              </label>

              <input
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="e.g. 500m"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Features
            </h2>

            <div className="mt-5 space-y-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <span className="font-medium">📶 Free Wi-Fi</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="powerOutlets"
                  checked={formData.powerOutlets}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <span className="font-medium">🔌 Power Outlets</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="quiet"
                  checked={formData.quiet}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <span className="font-medium">🤫 Quiet Environment</span>
              </label>
            </div>
          </section>

          {/* Additional Details */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Additional Details
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Rating
                </label>

                <input
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="e.g. 4.8"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Seating
                </label>

                <input
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                  placeholder="e.g. 50 seats"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Crowd Level
                </label>

                <select
                  name="crowdLevel"
                  value={formData.crowdLevel}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                >
                  <option value="">Select crowd level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Opening Hours
                </label>

                <input
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                  placeholder="e.g. 8:00 AM - 10:00 PM"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Message */}
          {message && (
            <div className="rounded-lg bg-slate-100 p-4 text-sm font-medium">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Study Spot..." : "Add Study Spot"}
          </button>
        </form>
      </div>
    </main>
  );
}
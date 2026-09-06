"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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

export default function EditSpotPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  // Load existing study spot
  useEffect(() => {
    async function loadSpot() {
      try {
        const response = await fetch(`/api/study-spots/${id}`);

        if (!response.ok) {
          throw new Error("Study spot not found");
        }

        const spot: StudySpot = await response.json();

        setFormData({
          name: spot.name,
          description: spot.description ?? "",
          icon: spot.icon,
          latitude: String(spot.latitude),
          longitude: String(spot.longitude),
          distance: spot.distance ?? "",
          rating: String(spot.rating),
          wifi: spot.wifi,
          powerOutlets: spot.powerOutlets,
          quiet: spot.quiet,
          seating: spot.seating ?? "",
          crowdLevel: spot.crowdLevel ?? "",
          openingHours: spot.openingHours ?? "",
        });
      } catch (error) {
        console.error(error);
        setMessage("❌ Failed to load study spot.");
      } finally {
        setLoading(false);
      }
    }

    loadSpot();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  // Update study spot
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/study-spots/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update study spot");
      }

      setMessage("✅ Study spot updated successfully!");

      setTimeout(() => {
        router.push("/spots");
        router.refresh();
      }, 800);
    } catch (error) {
      setMessage(
        `❌ ${
          error instanceof Error
            ? error.message
            : "Something went wrong"
        }`
      );
    } finally {
      setSaving(false);
    }
  }

  // Delete study spot
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this study spot? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/study-spots/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete study spot");
      }

      setMessage("✅ Study spot deleted successfully!");

      setTimeout(() => {
        router.push("/spots");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error(error);

      setMessage(
        `❌ ${
          error instanceof Error
            ? error.message
            : "Something went wrong"
        }`
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Loading study spot...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/spots"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Study Spots
          </Link>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Edit Study Spot
          </h1>

          <p className="mt-2 text-slate-600">
            Update the information for this study location.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
        >

          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-bold">
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
            <h2 className="text-xl font-bold">
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
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Distance
              </label>

              <input
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl font-bold">
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
                <span>📶 Free Wi-Fi</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="powerOutlets"
                  checked={formData.powerOutlets}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <span>🔌 Power Outlets</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="quiet"
                  checked={formData.quiet}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <span>🤫 Quiet Environment</span>
              </label>

            </div>
          </section>

          {/* Additional Details */}
          <section>
            <h2 className="text-xl font-bold">
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
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

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              type="submit"
              disabled={saving || deleting}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>

            <Link
              href="/spots"
              className="flex-1 rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

          </div>

          {/* Delete */}
          <div className="border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving || deleting}
              className="w-full rounded-lg border border-red-300 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting
                ? "Deleting Study Spot..."
                : "🗑️ Delete Study Spot"}
            </button>

            <p className="mt-2 text-center text-xs text-slate-500">
              This permanently removes the study spot from the database.
            </p>
          </div>

        </form>
      </div>
    </main>
  );
}
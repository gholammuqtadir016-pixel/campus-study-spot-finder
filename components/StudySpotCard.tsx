"use client";

import Link from "next/link";

interface StudySpotCardProps {
  id: number;
  icon: string;
  name: string;
  distance: string;
  rating: number;
  features: string[];
}

export default function StudySpotCard({
  id,
  icon,
  name,
  distance,
  rating,
  features,
}: StudySpotCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">

      {/* Icon */}
      <div className="flex h-40 items-center justify-center bg-slate-100 text-6xl">
        {icon}
      </div>

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              📍 {distance}
            </p>
          </div>

          <div className="rounded-lg bg-yellow-50 px-2 py-1 text-sm font-bold">
            ⭐ {rating.toFixed(1)}
          </div>
        </div>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-2">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <span
                key={`${feature}-${index}`}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {feature}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">
              No features listed
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/edit-spot/${id}`}
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            ✏️ Edit
          </Link>

          <Link
            href={`/edit-spot/${id}`}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View
          </Link>
        </div>

      </div>
    </article>
  );
}
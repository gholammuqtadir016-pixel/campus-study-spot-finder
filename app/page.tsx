import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudySpotCard from "@/components/StudySpotCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const studySpots = await prisma.studySpot.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 6,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-slate-900 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">

          <div className="text-6xl">📚</div>

          <p className="mt-6 font-semibold tracking-wide text-blue-400">
            CAMPUS STUDY SPOT FINDER
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Find a better place
            <br />
            to study.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Discover quiet libraries, cafés, computer labs and
            study spaces around your campus.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/spots"
              className="rounded-lg bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-700"
            >
              🔍 Explore Study Spots
            </Link>

            <Link
              href="/add-spot"
              className="rounded-lg border border-slate-600 px-7 py-3 font-semibold transition hover:bg-slate-800"
            >
              + Add a Spot
            </Link>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="text-4xl">🗺️</div>

            <h2 className="mt-4 text-xl font-bold">
              Find on the Map
            </h2>

            <p className="mt-2 text-slate-600">
              Explore study locations visually using an
              interactive campus map.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="text-4xl">🎛️</div>

            <h2 className="mt-4 text-xl font-bold">
              Smart Filters
            </h2>

            <p className="mt-2 text-slate-600">
              Filter locations by Wi-Fi, power, quietness,
              ratings and crowd level.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="text-4xl">⭐</div>

            <h2 className="mt-4 text-xl font-bold">
              Compare Spots
            </h2>

            <p className="mt-2 text-slate-600">
              Compare useful study information before
              choosing where to work.
            </p>
          </div>

        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-6xl px-6 pb-16">

        <div className="flex items-end justify-between">
          <div>
            <p className="font-semibold text-blue-600">
              TOP PICKS
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              Popular Study Spots
            </h2>
          </div>

          <Link
            href="/spots"
            className="hidden font-semibold text-blue-600 sm:block"
          >
            View all →
          </Link>
        </div>

        {studySpots.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studySpots.map((spot) => (
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
                  ...(spot.crowdLevel
                    ? [`👥 ${spot.crowdLevel}`]
                    : []),
                ]}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center">
            <p className="text-slate-500">
              No study spots have been added yet.
            </p>
          </div>
        )}

      </section>

      {/* CTA */}
      <section className="bg-blue-600 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Know a great study spot?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-blue-100">
          Add it to the campus directory and help other
          students find it.
        </p>

        <Link
          href="/add-spot"
          className="mt-7 inline-block rounded-lg bg-white px-7 py-3 font-bold text-blue-600 transition hover:bg-blue-50"
        >
          + Add Study Spot
        </Link>
      </section>

      <Footer />
    </div>
  );
}
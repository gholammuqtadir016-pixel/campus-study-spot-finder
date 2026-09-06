"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import { useState } from "react";

interface StudySpot {
  id: number;
  icon: string;
  name: string;
  description: string | null;
  distance: string | null;
  rating: number;

  latitude: number;
  longitude: number;

  wifi: boolean;
  powerOutlets: boolean;
  quiet: boolean;

  seating: string | null;
  crowdLevel: string | null;
  openingHours: string | null;
}

interface StudyMapProps {
  spots: StudySpot[];
}

export default function StudyMap({ spots }: StudyMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [selectedSpot, setSelectedSpot] = useState<StudySpot | null>(null);

  if (!apiKey) {
    return (
      <div className="flex h-96 items-center justify-center rounded-xl bg-slate-200">
        <p className="font-medium text-red-600">
          Google Maps API key is missing.
        </p>
      </div>
    );
  }

  const center = {
    lat: 22.5726,
    lng: 88.3639,
  };

  return (
    <div className="h-96 w-full overflow-hidden rounded-xl border">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={13}
          mapId="DEMO_MAP_ID"
        >
          {spots.map((spot) => (
            <AdvancedMarker
              key={spot.id}
              position={{
                lat: spot.latitude,
                lng: spot.longitude,
              }}
              onClick={() => setSelectedSpot(spot)}
            >
              <div className="cursor-pointer text-3xl">
                📍
              </div>
            </AdvancedMarker>
          ))}

          {selectedSpot && (
            <InfoWindow
              position={{
                lat: selectedSpot.latitude,
                lng: selectedSpot.longitude,
              }}
              onCloseClick={() => setSelectedSpot(null)}
            >
              <div className="min-w-[220px] p-2">
                <div className="mb-1 text-2xl">
                  {selectedSpot.icon}
                </div>

                <h3 className="text-lg font-bold">
                  {selectedSpot.name}
                </h3>

                {selectedSpot.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {selectedSpot.description}
                  </p>
                )}

                {selectedSpot.distance && (
                  <p className="mt-2 text-sm text-gray-500">
                    📍 {selectedSpot.distance}
                  </p>
                )}

                <p className="mt-2 font-medium">
                  ⭐ {selectedSpot.rating}
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedSpot.wifi && (
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                      📶 Wi-Fi
                    </span>
                  )}

                  {selectedSpot.powerOutlets && (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                      🔌 Power
                    </span>
                  )}

                  {selectedSpot.quiet && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700">
                      🤫 Quiet
                    </span>
                  )}
                </div>

                {selectedSpot.seating && (
                  <p className="mt-2 text-sm">
                    🪑 {selectedSpot.seating}
                  </p>
                )}

                {selectedSpot.crowdLevel && (
                  <p className="text-sm">
                    👥 Crowd: {selectedSpot.crowdLevel}
                  </p>
                )}

                {selectedSpot.openingHours && (
                  <p className="text-sm">
                    🕐 {selectedSpot.openingHours}
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
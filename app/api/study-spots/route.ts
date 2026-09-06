import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const studySpots = await prisma.studySpot.findMany({
      orderBy: {
        rating: "desc",
      },
    });

    return NextResponse.json(studySpots);
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Failed to fetch study spots" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      icon,
      latitude,
      longitude,
      distance,
      rating,
      wifi,
      powerOutlets,
      quiet,
      seating,
      crowdLevel,
      openingHours,
    } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Study spot name is required" },
        { status: 400 }
      );
    }

    if (
      latitude === undefined ||
      longitude === undefined ||
      Number.isNaN(Number(latitude)) ||
      Number.isNaN(Number(longitude))
    ) {
      return NextResponse.json(
        { error: "Valid latitude and longitude are required" },
        { status: 400 }
      );
    }

    const numericRating =
      rating === undefined || rating === ""
        ? 0
        : Number(rating);

    if (
      Number.isNaN(numericRating) ||
      numericRating < 0 ||
      numericRating > 5
    ) {
      return NextResponse.json(
        { error: "Rating must be between 0 and 5" },
        { status: 400 }
      );
    }

    const newStudySpot = await prisma.studySpot.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        icon: icon || "📚",

        latitude: Number(latitude),
        longitude: Number(longitude),

        distance: distance?.trim() || null,
        rating: numericRating,

        wifi: Boolean(wifi),
        powerOutlets: Boolean(powerOutlets),
        quiet: Boolean(quiet),

        seating: seating?.trim() || null,
        crowdLevel: crowdLevel || null,
        openingHours: openingHours?.trim() || null,
      },
    });

    return NextResponse.json(newStudySpot, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating study spot:", error);

    return NextResponse.json(
      { error: "Failed to create study spot" },
      { status: 500 }
    );
  }
}
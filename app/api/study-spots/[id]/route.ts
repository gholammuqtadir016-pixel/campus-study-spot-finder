import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET one study spot
export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const spotId = Number(id);

    if (!Number.isInteger(spotId)) {
      return NextResponse.json(
        { error: "Invalid study spot ID" },
        { status: 400 }
      );
    }

    const studySpot = await prisma.studySpot.findUnique({
      where: {
        id: spotId,
      },
    });

    if (!studySpot) {
      return NextResponse.json(
        { error: "Study spot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(studySpot);
  } catch (error) {
    console.error("Error fetching study spot:", error);

    return NextResponse.json(
      { error: "Failed to fetch study spot" },
      { status: 500 }
    );
  }
}

// UPDATE a study spot
export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const spotId = Number(id);
    const body = await request.json();

    if (!Number.isInteger(spotId)) {
      return NextResponse.json(
        { error: "Invalid study spot ID" },
        { status: 400 }
      );
    }

    const updatedSpot = await prisma.studySpot.update({
      where: {
        id: spotId,
      },
      data: {
        name: body.name,
        description: body.description || null,
        icon: body.icon || "📚",
        latitude: Number(body.latitude),
        longitude: Number(body.longitude),
        distance: body.distance || null,
        rating:
          body.rating !== undefined
            ? Number(body.rating)
            : 0,
        wifi: Boolean(body.wifi),
        powerOutlets: Boolean(body.powerOutlets),
        quiet: Boolean(body.quiet),
        seating: body.seating || null,
        crowdLevel: body.crowdLevel || null,
        openingHours: body.openingHours || null,
      },
    });

    return NextResponse.json(updatedSpot);
  } catch (error) {
    console.error("Error updating study spot:", error);

    return NextResponse.json(
      { error: "Failed to update study spot" },
      { status: 500 }
    );
  }
}

// DELETE a study spot
export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const spotId = Number(id);

    if (!Number.isInteger(spotId)) {
      return NextResponse.json(
        { error: "Invalid study spot ID" },
        { status: 400 }
      );
    }

    await prisma.studySpot.delete({
      where: {
        id: spotId,
      },
    });

    return NextResponse.json({
      message: "Study spot deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting study spot:", error);

    return NextResponse.json(
      { error: "Failed to delete study spot" },
      { status: 500 }
    );
  }
}
-- CreateTable
CREATE TABLE "StudySpot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL DEFAULT '📚',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "distance" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "powerOutlets" BOOLEAN NOT NULL DEFAULT false,
    "quiet" BOOLEAN NOT NULL DEFAULT false,
    "seating" TEXT,
    "crowdLevel" TEXT,
    "openingHours" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudySpot_pkey" PRIMARY KEY ("id")
);

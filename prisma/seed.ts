import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.studySpot.createMany({
    data: [
      {
        name: "Central Library",
        description: "A quiet library with reliable Wi-Fi and plenty of study space.",
        icon: "📚",
        latitude: 22.5726,
        longitude: 88.3639,
        distance: "0.5 km away",
        rating: 4.8,
        wifi: true,
        powerOutlets: true,
        quiet: true,
        seating: "Large",
        crowdLevel: "Low",
        openingHours: "8:00 AM - 10:00 PM",
      },
      {
        name: "Campus Café",
        description: "A comfortable café for studying with coffee and snacks.",
        icon: "☕",
        latitude: 22.5751,
        longitude: 88.3672,
        distance: "0.8 km away",
        rating: 4.6,
        wifi: true,
        powerOutlets: false,
        quiet: false,
        seating: "Medium",
        crowdLevel: "Medium",
        openingHours: "9:00 AM - 9:00 PM",
      },
      {
        name: "Student Lounge",
        description: "A relaxed student space with comfortable seating.",
        icon: "🪑",
        latitude: 22.5698,
        longitude: 88.3605,
        distance: "1.2 km away",
        rating: 4.5,
        wifi: false,
        powerOutlets: true,
        quiet: true,
        seating: "Medium",
        crowdLevel: "Low",
        openingHours: "8:00 AM - 8:00 PM",
      },
      {
        name: "Engineering Library",
        description: "A focused study environment for engineering students.",
        icon: "📖",
        latitude: 22.5784,
        longitude: 88.3712,
        distance: "1.5 km away",
        rating: 4.7,
        wifi: true,
        powerOutlets: true,
        quiet: true,
        seating: "Large",
        crowdLevel: "Low",
        openingHours: "8:00 AM - 11:00 PM",
      },
      {
        name: "Innovation Hub",
        description: "A modern workspace suitable for individual and group study.",
        icon: "💻",
        latitude: 22.5669,
        longitude: 88.3691,
        distance: "1.8 km away",
        rating: 4.4,
        wifi: true,
        powerOutlets: true,
        quiet: false,
        seating: "Large",
        crowdLevel: "Medium",
        openingHours: "9:00 AM - 10:00 PM",
      },
      {
        name: "Campus Garden",
        description: "An outdoor study area for students who enjoy studying in nature.",
        icon: "🌿",
        latitude: 22.5801,
        longitude: 88.3587,
        distance: "2.0 km away",
        rating: 4.3,
        wifi: false,
        powerOutlets: false,
        quiet: true,
        seating: "Small",
        crowdLevel: "Low",
        openingHours: "7:00 AM - 7:00 PM",
      },
    ],
  });

  console.log("Study spots added successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
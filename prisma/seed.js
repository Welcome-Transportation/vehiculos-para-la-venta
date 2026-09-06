const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listings = [
  {
    title: "2015 MCI J4500 Charter Bus - 56 Passenger",
    price: 62500,
    description:
      "Well-maintained 56-passenger MCI J4500 charter bus, ideal for tour operators and shuttle services. Recent engine service and new tires all around. Clean interior with reclining seats, overhead storage, and a rear luggage bay.",
    city: "Salt Lake City",
    county: "Salt Lake County",
    zipCode: "84101",
    latitude: 40.7608,
    longitude: -111.891,
    mileage: 312000,
    isAdaAccessible: false,
    hasSeatBelts: true,
    hasTVs: true,
    hasPASystem: true,
    hasWorkingRadio: true,
    hasBluetooth: true,
    hasUSBPorts: true,
    hasWorkingBathroom: true,
    isOperable: true,
    fleetStatus: "ACTIVE_FLEET",
    isMigrated: false,
    photos: ["/listings/bus-1.jpg", "/listings/bus-fleet.jpg"],
  },
  {
    title: "2012 Freightliner Shuttle Bus - ADA Accessible",
    price: 38900,
    description:
      "Reliable 30-passenger shuttle bus with a wheelchair lift and two wheelchair securement positions. Great for airport shuttles, school routes, or senior transportation. Runs and drives daily, currently in active service.",
    city: "Ogden",
    county: "Weber County",
    zipCode: "84401",
    latitude: 41.223,
    longitude: -111.9738,
    mileage: 198000,
    isAdaAccessible: true,
    hasSeatBelts: true,
    hasTVs: false,
    hasPASystem: true,
    hasWorkingRadio: true,
    hasBluetooth: false,
    hasUSBPorts: false,
    hasWorkingBathroom: false,
    isOperable: true,
    fleetStatus: "ACTIVE_FLEET",
    isMigrated: false,
    photos: ["/listings/bus-fleet.jpg"],
  },
  {
    title: "2018 Van Hool CX45 Luxury Coach",
    price: 138000,
    description:
      "Premium 52-passenger Van Hool motorcoach with leather seating, three TVs, onboard restroom, and a full PA system. Low mileage for its class and garage-kept. Perfect for corporate charters and long-distance tours.",
    city: "Provo",
    county: "Utah County",
    zipCode: "84601",
    latitude: 40.2338,
    longitude: -111.6585,
    mileage: 145000,
    isAdaAccessible: false,
    hasSeatBelts: true,
    hasTVs: true,
    hasPASystem: true,
    hasWorkingRadio: true,
    hasBluetooth: true,
    hasUSBPorts: true,
    hasWorkingBathroom: true,
    isOperable: true,
    fleetStatus: "PARKED",
    isMigrated: false,
    photos: ["/listings/bus-1.jpg"],
  },
  {
    title: "2009 Prevost H3-45 - Needs Engine Work",
    price: 24500,
    description:
      "Parked coach being sold as-is, needs engine repair before returning to service. Body and interior are in solid shape - good candidate for a mechanic or fleet with in-house maintenance. Priced accordingly.",
    city: "St. George",
    county: "Washington County",
    zipCode: "84770",
    latitude: 37.0965,
    longitude: -113.5684,
    mileage: 421000,
    isAdaAccessible: false,
    hasSeatBelts: true,
    hasTVs: false,
    hasPASystem: false,
    hasWorkingRadio: false,
    hasBluetooth: false,
    hasUSBPorts: false,
    hasWorkingBathroom: true,
    isOperable: false,
    fleetStatus: "PARKED",
    isMigrated: false,
    photos: ["/listings/bus-fleet.jpg"],
  },
];

async function main() {
  await prisma.contactMessage.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.listing.deleteMany();

  for (const { photos, ...data } of listings) {
    await prisma.listing.create({
      data: {
        ...data,
        photos: {
          create: photos.map((url, order) => ({ url, order })),
        },
      },
    });
  }

  console.log(`Seeded ${listings.length} listings.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listings = [
  {
    title: "2001 Van Hool C2045 Motorcoach - 56 Passenger",
    price: 25000,
    description:
      "2001 Van Hool C2045 motorcoach, seats 56. Equipped with TVs and a DVD player, onboard PA system with microphone, working bathroom, and a radio with Bluetooth connectivity for media playback. Currently in active service - runs and drives.",
    city: "Orlando",
    county: "Orange County",
    state: "FL",
    zipCode: "32837",
    latitude: 28.3852,
    longitude: -81.4406,
    mileage: null,
    isAdaAccessible: false,
    hasSeatBelts: false,
    hasTVs: true,
    hasPASystem: true,
    hasWorkingRadio: true,
    hasBluetooth: true,
    hasUSBPorts: false,
    hasWorkingBathroom: true,
    isOperable: true,
    fleetStatus: "ACTIVE_FLEET",
    isMigrated: false,
    sellerName: "Gloria",
    sellerPhone: "(407) 489-3383",
    sellerCompany: "Welcome Transportation",
    photos: ["/listings/vanhool-c2045-orlando.jpg"],
  },
];

async function main() {
  // Safe to run on every deploy: only bootstraps the very first listing on
  // an empty database. Never wipes real listings added later through
  // /sell, so it can stay in the build command without risk.
  const existing = await prisma.listing.count();
  if (existing > 0) {
    console.log(`Database already has ${existing} listing(s), skipping seed.`);
    return;
  }

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

  console.log(`Seeded ${listings.length} listing(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

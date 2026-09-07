const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listings = [
  {
    title: "2001 Van Hool C4510 Motorcoach - 56 Passenger",
    price: 25000,
    description:
      "2001 Van Hool C4510 motorcoach, seats 56. Equipped with TVs and a DVD player, onboard PA system with microphone, working bathroom, and a radio with Bluetooth connectivity for media playback. Currently in active service - runs and drives.",
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
    photos: ["/listings/vanhool-c4510-orlando.jpg"],
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

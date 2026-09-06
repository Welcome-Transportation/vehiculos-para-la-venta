-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "mileage" INTEGER,
    "isAdaAccessible" BOOLEAN NOT NULL DEFAULT false,
    "hasSeatBelts" BOOLEAN NOT NULL DEFAULT false,
    "hasTVs" BOOLEAN NOT NULL DEFAULT false,
    "hasPASystem" BOOLEAN NOT NULL DEFAULT false,
    "hasWorkingRadio" BOOLEAN NOT NULL DEFAULT false,
    "hasBluetooth" BOOLEAN NOT NULL DEFAULT false,
    "hasUSBPorts" BOOLEAN NOT NULL DEFAULT false,
    "hasWorkingBathroom" BOOLEAN NOT NULL DEFAULT false,
    "isOperable" BOOLEAN NOT NULL DEFAULT true,
    "fleetStatus" TEXT NOT NULL DEFAULT 'PARKED',
    "isMigrated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "listingId" TEXT NOT NULL,
    CONSTRAINT "Photo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingId" TEXT NOT NULL,
    CONSTRAINT "ContactMessage_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

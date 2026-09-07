-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'FL',
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
INSERT INTO "new_Listing" ("city", "county", "createdAt", "description", "fleetStatus", "hasBluetooth", "hasPASystem", "hasSeatBelts", "hasTVs", "hasUSBPorts", "hasWorkingBathroom", "hasWorkingRadio", "id", "isAdaAccessible", "isMigrated", "isOperable", "latitude", "longitude", "mileage", "price", "title", "zipCode") SELECT "city", "county", "createdAt", "description", "fleetStatus", "hasBluetooth", "hasPASystem", "hasSeatBelts", "hasTVs", "hasUSBPorts", "hasWorkingBathroom", "hasWorkingRadio", "id", "isAdaAccessible", "isMigrated", "isOperable", "latitude", "longitude", "mileage", "price", "title", "zipCode" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

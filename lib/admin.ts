import { prisma } from "./prisma";

// Admin-only: includes the private originalSourceUrl / originalSellerContact
// fields so the site owner can see both a buyer's inquiry and, for migrated
// listings, how to reach the original seller to broker the sale.
export function getContactMessages() {
  return prisma.contactMessage.findMany({
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          price: true,
          isMigrated: true,
          originalSourceUrl: true,
          originalSellerContact: true,
          sellerName: true,
          sellerPhone: true,
          sellerCompany: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

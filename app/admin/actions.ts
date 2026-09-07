"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteContactMessage(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;

  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin");
}

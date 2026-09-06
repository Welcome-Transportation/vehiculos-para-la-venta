"use server";

import { prisma } from "@/lib/prisma";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContactMessage(
  listingId: string,
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }

  await prisma.contactMessage.create({
    data: { listingId, name, email, message },
  });

  return {
    status: "success",
    message: "Thanks! Your message has been sent to the seller.",
  };
}

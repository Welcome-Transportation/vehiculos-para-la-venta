"use server";

type ScrapedListing = {
  title: string;
  description: string;
  priceGuess: number | null;
  photos: string[];
  sourceHostname: string;
  sellerContactGuess: string;
  features: {
    isAdaAccessible: boolean;
    hasSeatBelts: boolean;
    hasTVs: boolean;
    hasPASystem: boolean;
    hasBluetooth: boolean;
    hasUSBPorts: boolean;
    hasWorkingBathroom: boolean;
  };
};

export type ScrapeState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; data: ScrapedListing };

const MAX_PHOTOS = 4;
const MAX_IMAGE_BYTES = 6 * 1024 * 1024;

function isPrivateOrLocalHost(hostname: string) {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local")) return true;
  if (/^127\./.test(h) || h === "::1") return true;
  if (/^10\./.test(h)) return true;
  if (/^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(h)) return true;
  if (/^169\.254\./.test(h)) return true;
  return false;
}

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveUrl(maybeRelative: string, base: string) {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return null;
  }
}

function extractImageCandidates(html: string, pageUrl: string): string[] {
  const urls = new Set<string>();

  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (og) {
    const resolved = resolveUrl(og[1], pageUrl);
    if (resolved) urls.add(resolved);
  }

  const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  for (const m of imgMatches) {
    const resolved = resolveUrl(m[1], pageUrl);
    if (!resolved) continue;
    // Skip obvious icons/logos/tracking pixels by size hints in the filename.
    if (/logo|icon|sprite|pixel|avatar/i.test(resolved)) continue;
    urls.add(resolved);
    if (urls.size >= MAX_PHOTOS * 3) break;
  }

  return Array.from(urls);
}

async function downloadAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.byteLength > MAX_IMAGE_BYTES) return null;
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

function detectFeatures(text: string) {
  const t = text.toLowerCase();
  const has = (...words: string[]) => words.some((w) => t.includes(w));
  return {
    isAdaAccessible: has("wheelchair", "ada accessible", "ada-accessible", "handicap accessible"),
    hasSeatBelts: has("seat belt", "seatbelt", "seat-belt"),
    hasTVs: has(" tv ", "tvs", "television", "monitor"),
    hasPASystem: has("pa system", "p.a. system", "public address", "microphone"),
    hasBluetooth: has("bluetooth"),
    hasUSBPorts: has("usb port", "usb outlet", "usb charging"),
    hasWorkingBathroom: has("restroom", "lavatory", "bathroom"),
  };
}

function guessContactInfo(text: string): string {
  const phones = text.match(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/g) || [];
  const emails = text.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi) || [];
  const parts: string[] = [];
  if (phones.length) parts.push(`Phone: ${Array.from(new Set(phones)).slice(0, 2).join(", ")}`);
  if (emails.length) parts.push(`Email: ${Array.from(new Set(emails)).slice(0, 2).join(", ")}`);
  return parts.join(" | ");
}

function guessPrice(text: string): number | null {
  const matches = text.match(/\$\s?([\d]{1,3}(?:,\d{3})+|\d{4,6})/g);
  if (!matches) return null;
  const values = matches
    .map((m) => Number(m.replace(/[^\d]/g, "")))
    .filter((n) => n >= 1000 && n <= 2_000_000);
  if (values.length === 0) return null;
  return Math.max(...values);
}

export async function fetchListingFromUrl(
  _prevState: ScrapeState,
  formData: FormData
): Promise<ScrapeState> {
  const rawUrl = String(formData.get("sourceUrl") || "").trim();
  if (!rawUrl) {
    return { status: "error", message: "Paste a URL first." };
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { status: "error", message: "That doesn't look like a valid URL." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { status: "error", message: "Only http/https URLs are supported." };
  }
  if (isPrivateOrLocalHost(parsed.hostname)) {
    return { status: "error", message: "That host isn't allowed." };
  }

  let html: string;
  try {
    const res = await fetch(parsed.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; BusBuyBot/1.0; +https://busbuy.netlify.app)",
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return { status: "error", message: `The page returned ${res.status}.` };
    }
    html = await res.text();
  } catch {
    return { status: "error", message: "Couldn't reach that page." };
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  const title = (ogTitleMatch?.[1] || titleMatch?.[1] || "").trim().slice(0, 200);

  const descMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  let description = (descMatch?.[1] || "").trim();

  const pageText = stripTags(html);
  if (!description) {
    description = pageText.slice(0, 400);
  }

  const priceGuess = guessPrice(pageText);
  const features = detectFeatures(pageText);
  const sellerContactGuess = guessContactInfo(pageText);

  const imageCandidates = extractImageCandidates(html, parsed.toString());
  const photos: string[] = [];
  for (const src of imageCandidates) {
    if (photos.length >= MAX_PHOTOS) break;
    const dataUrl = await downloadAsDataUrl(src);
    if (dataUrl) photos.push(dataUrl);
  }

  return {
    status: "success",
    data: {
      title,
      description: description.slice(0, 600),
      priceGuess,
      photos,
      sourceHostname: parsed.hostname,
      sellerContactGuess,
      features,
    },
  };
}

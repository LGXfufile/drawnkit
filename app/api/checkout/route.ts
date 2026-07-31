import { NextResponse } from "next/server";
import { getWaffoClient, isWaffoConfigured } from "@/lib/waffo";
import { site } from "@/lib/site";
import { createPendingOrder, isPaymentStoreConfigured, updateOrder } from "@/lib/payments";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();

function allowed(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  current.count += 1;
  return current.count <= 8;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || "0");
  if (length > 4096) return NextResponse.json({ message: "Request is too large." }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allowed(ip)) return NextResponse.json({ message: "Too many checkout attempts. Please wait one minute." }, { status: 429 });
  let body: { offer?: string };
  try {
    const rawBody = await request.text();
    if (rawBody.length > 4096) return NextResponse.json({ message: "Request is too large." }, { status: 413 });
    body = JSON.parse(rawBody) as { offer?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  if (body.offer !== "founding-kit") return NextResponse.json({ message: "Unknown offer." }, { status: 400 });
  if (!isWaffoConfigured() || !isPaymentStoreConfigured()) {
    return NextResponse.json(
      { message: "Secure checkout is being connected. The free studio is still open." },
      { status: 503, headers: { "Retry-After": "300" } }
    );
  }

  try {
    const claim = randomBytes(24).toString("base64url");
    const externalId = `dk_${claim}`;
    const now = new Date().toISOString();
    const pending = { externalId, claim, status: "pending" as const, offer: "founding-kit-v1" as const, createdAt: now, updatedAt: now };
    await createPendingOrder(pending);
    const client = getWaffoClient();
    const session = await client.checkout.createSession({
      productId: process.env.WAFFO_PRODUCT_ID!,
      currency: "USD",
      successUrl: `${site.url}/purchase/success?claim=${encodeURIComponent(claim)}`,
      expiresInSeconds: 1800,
      darkMode: true,
      metadata: { offer: "founding-kit-v1" },
      orderMerchantExternalId: externalId
    });
    await updateOrder({ ...pending, sessionId: session.sessionId, updatedAt: new Date().toISOString() });
    const checkout = new URL(session.checkoutUrl);
    if (checkout.protocol !== "https:") throw new Error("INSECURE_CHECKOUT_URL");
    const allowedHosts = (process.env.WAFFO_CHECKOUT_HOSTS || "checkout.waffo.com,.waffo.com,.waffo.app")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);
    const hostname = checkout.hostname.toLowerCase();
    const trusted = allowedHosts.some((host) => host.startsWith(".") ? hostname.endsWith(host) : hostname === host);
    if (!trusted) throw new Error(`UNTRUSTED_CHECKOUT_URL:${hostname}`);
    return NextResponse.json(
      { checkoutUrl: checkout.toString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    const safeError = error instanceof Error ? {
      name: error.name,
      message: error.message.slice(0, 160),
      status: "status" in error && typeof error.status === "number" ? error.status : undefined
    } : { name: "UnknownError", message: "Unknown checkout failure" };
    console.error("checkout_creation_failed", safeError);
    return NextResponse.json(
      { message: "Checkout could not open. Your card was not charged." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}

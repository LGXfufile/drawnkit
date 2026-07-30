import { NextResponse } from "next/server";
import { getWaffoClient, isWaffoConfigured } from "@/lib/waffo";
import { site } from "@/lib/site";

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
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allowed(ip)) return NextResponse.json({ message: "Too many checkout attempts. Please wait one minute." }, { status: 429 });
  if (!isWaffoConfigured()) {
    return NextResponse.json(
      { message: "Secure checkout is being connected. The free studio is still open." },
      { status: 503, headers: { "Retry-After": "300" } }
    );
  }

  try {
    const body = await request.json() as { offer?: string };
    if (body.offer !== "founding-kit") return NextResponse.json({ message: "Unknown offer." }, { status: 400 });
    const client = getWaffoClient();
    const session = await client.checkout.createSession({
      productId: process.env.WAFFO_PRODUCT_ID!,
      currency: "USD",
      successUrl: `${site.url}/purchase/success`,
      expiresInSeconds: 1800,
      darkMode: true,
      metadata: { offer: "founding-kit-v1" }
    });
    const checkout = new URL(session.checkoutUrl);
    if (checkout.protocol !== "https:") throw new Error("INSECURE_CHECKOUT_URL");
    return NextResponse.json(
      { checkoutUrl: checkout.toString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { message: "Checkout could not open. Your card was not charged." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}

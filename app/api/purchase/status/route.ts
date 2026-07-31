import { NextResponse } from "next/server";
import { getOrder, isPaymentStoreConfigured } from "@/lib/payments";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isPaymentStoreConfigured()) return NextResponse.json({ status: "unavailable" }, { status: 503 });
  const claim = new URL(request.url).searchParams.get("claim") || "";
  if (!/^[A-Za-z0-9_-]{32}$/.test(claim)) return NextResponse.json({ status: "invalid" }, { status: 400 });
  const order = await getOrder(`dk_${claim}`);
  if (!order || order.claim !== claim) return NextResponse.json({ status: "not_found" }, { status: 404 });
  return NextResponse.json(
    { status: order.status, downloadUrl: order.status === "paid" ? `/api/purchase/download?claim=${encodeURIComponent(claim)}` : undefined },
    { headers: { "Cache-Control": "no-store" } }
  );
}

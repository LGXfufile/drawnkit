import { getOrder } from "@/lib/payments";
import { foundingKitMarkdown } from "@/lib/founding-kit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const claim = new URL(request.url).searchParams.get("claim") || "";
  if (!/^[A-Za-z0-9_-]{32}$/.test(claim)) return new Response("Invalid delivery link", { status: 400 });
  const order = await getOrder(`dk_${claim}`);
  if (!order || order.claim !== claim || order.status !== "paid") return new Response("Purchase not verified", { status: 403 });
  return new Response(foundingKitMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="drawnkit-founding-kit.md"',
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

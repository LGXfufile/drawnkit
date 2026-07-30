import { verifyWebhook, WebhookEventType } from "@waffo/pancake-ts";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("x-waffo-signature");
  if (!signature) return new Response("Missing signature", { status: 401 });
  const rawBody = await request.text();
  try {
    const event = verifyWebhook(rawBody, signature, { environment: "prod" });
    if (event.mode !== "prod") return new Response("Wrong environment", { status: 400 });
    if (process.env.WAFFO_STORE_ID && event.storeId !== process.env.WAFFO_STORE_ID) return new Response("Wrong store", { status: 400 });
    if (event.eventType === WebhookEventType.OrderCompleted) {
      if (event.data.currency !== "USD" || Number(event.data.amount) !== 1) return new Response("Order mismatch", { status: 400 });
      // A durable entitlement store is intentionally required before payment is enabled.
      // Returning 503 makes Waffo retry instead of acknowledging an order we cannot safely deliver.
      if (!process.env.ENTITLEMENT_STORE_CONFIGURED) return new Response("Fulfillment store unavailable", { status: 503 });
    }
    return new Response("OK", { status: 200 });
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }
}

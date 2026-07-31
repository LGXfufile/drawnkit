import { verifyWebhook, WebhookEventType, type WebhookEventData } from "@waffo/pancake-ts";
import { completeOrderOnce, getOrder } from "@/lib/payments";

export const runtime = "nodejs";

function waffoEnvironment() {
  return process.env.WAFFO_ENVIRONMENT === "test" ? "test" as const : "prod" as const;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || "0");
  if (length > 262_144) return new Response("Payload too large", { status: 413 });
  const signature = request.headers.get("x-waffo-signature");
  if (!signature) return new Response("Missing signature", { status: 401 });
  const rawBody = await request.text();
  if (rawBody.length > 262_144) return new Response("Payload too large", { status: 413 });
  try {
    const environment = waffoEnvironment();
    const event = verifyWebhook<WebhookEventData>(rawBody, signature, { environment });
    if (event.mode !== environment) return new Response("Wrong environment", { status: 400 });
    if (!process.env.WAFFO_STORE_ID || event.storeId !== process.env.WAFFO_STORE_ID) return new Response("Wrong store", { status: 400 });
    if (event.eventType === WebhookEventType.OrderCompleted || event.eventType === WebhookEventType.RefundSucceeded) {
      const externalId = event.data.orderMerchantExternalId;
      if (!externalId?.startsWith("dk_") || event.data.orderMetadata?.offer !== "founding-kit-v1") return new Response("Order mismatch", { status: 400 });
      const pending = await getOrder(externalId);
      if (!pending || pending.offer !== "founding-kit-v1") return new Response("Unknown order", { status: 400 });
      if (event.eventType === WebhookEventType.OrderCompleted) {
        const amount = event.data.total ?? event.data.amount;
        if (event.data.currency !== "USD" || !/^1(?:\.0{1,2})?$/.test(amount) || (event.data.paymentStatus && event.data.paymentStatus !== "succeeded")) {
          return new Response("Order mismatch", { status: 400 });
        }
      }
      const status = event.eventType === WebhookEventType.OrderCompleted ? "paid" as const : "refunded" as const;
      await completeOrderOnce(event.id, {
        ...pending,
        status,
        orderId: event.data.orderId,
        buyerEmail: event.data.buyerEmail,
        updatedAt: new Date().toISOString()
      });
    }
    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof Error && /signature|timestamp|webhook/i.test(error.message)) return new Response("Invalid signature", { status: 401 });
    return new Response("Temporary fulfillment failure", { status: 503 });
  }
}

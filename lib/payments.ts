import "server-only";
import { Redis } from "@upstash/redis";

export type PaymentOrder = {
  externalId: string;
  claim: string;
  status: "pending" | "paid" | "refunded" | "session_failed";
  offer: "founding-kit-v1";
  createdAt: string;
  updatedAt: string;
  sessionId?: string;
  orderId?: string;
  buyerEmail?: string;
};

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("PAYMENT_STORE_NOT_CONFIGURED");
  return { url, token };
}

export function isPaymentStoreConfigured() {
  return Boolean(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}

function redis() {
  return new Redis(redisConfig());
}

const orderKey = (externalId: string) => `payment:order:${externalId}`;
const eventKey = (eventId: string) => `payment:event:${eventId}`;

export async function createPendingOrder(order: PaymentOrder) {
  const result = await redis().set(orderKey(order.externalId), order, { nx: true, ex: 60 * 60 * 24 * 30 });
  if (result !== "OK") throw new Error("ORDER_COLLISION");
}

export async function updateOrder(order: PaymentOrder) {
  await redis().set(orderKey(order.externalId), order, { ex: 60 * 60 * 24 * 30 });
}

export async function getOrder(externalId: string) {
  return redis().get<PaymentOrder>(orderKey(externalId));
}

export async function completeOrderOnce(eventId: string, order: PaymentOrder) {
  const result = await redis().eval<string[], number>(
    `if redis.call("EXISTS", KEYS[1]) == 1 then return 0 end
     redis.call("SET", KEYS[1], "processed", "EX", ARGV[2])
     redis.call("SET", KEYS[2], ARGV[1], "EX", ARGV[2])
     return 1`,
    [eventKey(eventId), orderKey(order.externalId)],
    [JSON.stringify(order), String(60 * 60 * 24 * 30)]
  );
  return result === 1;
}

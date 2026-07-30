import "server-only";
import { WaffoPancake } from "@waffo/pancake-ts";

function privateKey() {
  if (process.env.WAFFO_PRIVATE_KEY_BASE64) {
    return Buffer.from(process.env.WAFFO_PRIVATE_KEY_BASE64, "base64").toString("utf8");
  }
  return process.env.WAFFO_PRIVATE_KEY || "";
}

export function isWaffoConfigured() {
  return Boolean(process.env.WAFFO_MERCHANT_ID && privateKey() && process.env.WAFFO_PRODUCT_ID);
}

export function getWaffoClient() {
  const merchantId = process.env.WAFFO_MERCHANT_ID;
  const key = privateKey();
  if (!merchantId || !key) throw new Error("PAYMENT_NOT_CONFIGURED");
  return new WaffoPancake({ merchantId, privateKey: key });
}

"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

export function CheckoutButton({ placement = "pricing" }: { placement?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function checkout() {
    if (state === "loading") return;
    setState("loading");
    setMessage("");
    track("checkout_started", { offer: "founding-kit", placement });
    const popup = window.open("about:blank", "_blank");
    if (popup) {
      popup.opener = null;
      popup.document.title = "Opening secure checkout…";
      popup.document.body.textContent = "Opening secure checkout…";
    }
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12_000);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ offer: "founding-kit", placement }),
        signal: controller.signal
      });
      window.clearTimeout(timeout);
      const data = await response.json() as { checkoutUrl?: string; message?: string };
      if (!response.ok || !data.checkoutUrl) throw new Error(data.message || "Checkout is taking a short pause.");
      if (!data.checkoutUrl.startsWith("https://")) throw new Error("The checkout URL was not secure.");
      if (popup) popup.location.replace(data.checkoutUrl);
      else {
        setState("error");
        setMessage("Your browser blocked the checkout tab. Allow pop-ups and try again.");
        track("checkout_failed", { reason: "popup_blocked", placement });
        return;
      }
      setState("idle");
    } catch (error) {
      popup?.close();
      setState("error");
      setMessage(error instanceof Error && error.name === "AbortError" ? "Checkout timed out. Your card was not charged." : error instanceof Error ? error.message : "Checkout is unavailable.");
      track("checkout_failed", {
        reason: error instanceof Error && error.name === "AbortError" ? "timeout" : "service_unavailable",
        placement
      });
    }
  }

  return (
    <div className="checkout-wrap">
      <button className="button buy" type="button" onClick={checkout} disabled={state === "loading"}>
        {state === "loading" ? "Opening secure checkout…" : "Get the complete kit — $1"}
      </button>
      {state === "error" && <p className="checkout-error" role="alert">{message}</p>}
    </div>
  );
}

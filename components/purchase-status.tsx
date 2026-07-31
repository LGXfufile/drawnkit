"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

type Result = { status: string; downloadUrl?: string };

export function PurchaseStatus({ claim }: { claim: string }) {
  const [result, setResult] = useState<Result>({ status: claim ? "checking" : "invalid" });

  useEffect(() => {
    if (!claim) return;
    let active = true;
    let attempts = 0;
    async function check() {
      attempts += 1;
      try {
        const response = await fetch(`/api/purchase/status?claim=${encodeURIComponent(claim)}`, { cache: "no-store" });
        const next = await response.json() as Result;
        if (!active) return;
        setResult(next);
        if (next.status === "paid") track("purchase_completed", { offer: "founding-kit" });
        if (next.status === "pending" && attempts < 20) window.setTimeout(check, 3000);
      } catch {
        if (active) setResult({ status: "unavailable" });
      }
    }
    check();
    return () => { active = false; };
  }, [claim]);

  if (result.status === "paid") return <div className="status-page shell"><span className="status-mark">✓</span><p className="eyebrow">Payment verified</p><h1>Your kit is ready.</h1><p>Your private delivery link is active. Keep this page if you want to download it again.</p><a className="button primary" href={result.downloadUrl} onClick={() => track("download_completed", { offer: "founding-kit" })}>Download the kit ↗</a></div>;
  if (result.status === "refunded") return <div className="status-page shell"><p className="eyebrow">Order refunded</p><h1>This delivery link is no longer active.</h1><Link className="button primary" href="/generator">Return to the free studio</Link></div>;
  if (result.status === "pending" || result.status === "checking") return <div className="status-page shell"><span className="status-mark" aria-hidden="true">···</span><p className="eyebrow">Confirming payment</p><h1>One quiet moment.</h1><p>We are securely confirming your order. This page updates automatically—no need to pay again.</p><Link className="button primary" href="/generator">Keep creating while we verify ↗</Link></div>;
  return <div className="status-page shell"><p className="eyebrow">Purchase status</p><h1>We could not verify this link.</h1><p>No charge is created from this page. Return to pricing to start or retry a secure checkout.</p><Link className="button primary" href="/pricing">Return to pricing</Link></div>;
}

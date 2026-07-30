import Link from "next/link";

export default function PurchaseSuccess() {
  return (
    <div className="status-page shell">
      <span className="status-mark">✓</span>
      <p className="eyebrow">Payment received</p>
      <h1>Your kit is being prepared.</h1>
      <p>For your security, this page never unlocks a download from a URL alone. Waffo will confirm the order, then your private delivery link will become available through the verified purchase flow.</p>
      <Link className="button primary" href="/generator">Keep creating while we verify ↗</Link>
    </div>
  );
}

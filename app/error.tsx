"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="status-page shell"><p className="eyebrow">A small creative pause</p><h1>Something didn&apos;t settle correctly.</h1><p>Your work has not been charged or submitted. Try this view again.</p><button className="button primary" onClick={reset}>Try again</button></div>;
}

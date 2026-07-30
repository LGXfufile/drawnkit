import Link from "next/link";
export default function NotFound() {
  return <div className="status-page shell"><p className="eyebrow">404 · A blank sheet</p><h1>This line wandered off the page.</h1><Link className="button primary" href="/">Return home</Link></div>;
}

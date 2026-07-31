import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="DrawnKit home">
          <span className="wordmark-mark" aria-hidden="true"><i /><i /><i /></span>
          DrawnKit
        </Link>
        <div className="nav-links">
          <Link href="/styles">Styles</Link>
          <Link href="/use-cases">Uses</Link>
          <Link href="/generator">Generator</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <Link className="nav-cta" href="/generator">Try free <span aria-hidden="true">↗</span></Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer shell">
      <div>
        <Link className="wordmark" href="/">DrawnKit</Link>
        <p>Made for ideas that should still feel human.</p>
      </div>
      <div className="footer-links">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/refund">Refunds</Link>
      </div>
      <p>© {new Date().getFullYear()} DrawnKit</p>
    </footer>
  );
}

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer, Header } from "@/components/header";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "DrawnKit — Hand-drawn AI prompt studio", template: "%s — DrawnKit" },
  description: site.description,
  keywords: ["hand drawn AI prompt generator", "AI illustration prompts", "consistent illustration style", "storybook prompt"],
  openGraph: {
    title: "DrawnKit — Give AI a steadier hand",
    description: site.description,
    type: "website",
    images: [{ url: "/styles/nordic-storybook.jpg", width: 1200, height: 630, alt: "DrawnKit hand-drawn illustration styles" }]
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" }
};

export const viewport: Viewport = { themeColor: "#f3f0e8", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

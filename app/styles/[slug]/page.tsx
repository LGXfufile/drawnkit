import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { styles, getStyle } from "@/lib/styles";

export function generateStaticParams() {
  return styles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const style = getStyle((await params).slug);
  if (!style) return {};
  return {
    title: `${style.name} AI prompt with example`,
    description: `${style.description} See a real example and create a reusable ${style.name.toLowerCase()} prompt.`,
    alternates: { canonical: `/styles/${style.slug}` },
    openGraph: { images: [{ url: style.image }] }
  };
}

export default async function StylePage({ params }: { params: Promise<{ slug: string }> }) {
  const style = getStyle((await params).slug);
  if (!style) notFound();
  const related = styles.filter((item) => item.category === style.category && item.slug !== style.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Create a ${style.name} AI illustration`,
    step: [
      { "@type": "HowToStep", name: "Choose the style", text: `Select ${style.name} in DrawnKit.` },
      { "@type": "HowToStep", name: "Describe the subject", text: "Describe one clear subject, action and setting." },
      { "@type": "HowToStep", name: "Generate and refine", text: "Copy the recipe into your preferred image model and keep the style section stable across the series." }
    ]
  };

  return (
    <div className="style-page shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="style-page-copy">
        <Link className="back-link" href="/#styles">← All styles</Link>
        <p className="eyebrow">{style.category} · {style.free ? "Free recipe" : "Founding Kit"}</p>
        <h1>{style.name}</h1>
        <p className="style-lead">{style.description}</p>
        <p>Use this visual language when you want a series to feel tactile and authored, without losing consistency between subjects and scenes.</p>
        <div className="style-actions">
          <Link className="button primary" href={`/generator?style=${style.slug}`}>Remix this style ↗</Link>
          {!style.free && <Link className="text-link" href="/pricing">Unlock full recipe · $1 →</Link>}
        </div>
      </div>
      <div className="style-hero-image">
        <Image src={style.image} alt={`${style.name} example result`} fill priority sizes="(max-width: 850px) 92vw, 48vw" />
      </div>
      <section className="recipe-preview">
        <p className="eyebrow">Recipe anatomy</p>
        <h2>Keep the visual constants.<br />Change the story.</h2>
        <div className="recipe-parts">
          <article><span>01</span><h3>Subject</h3><p>The character, object or scene you want to change.</p></article>
          <article><span>02</span><h3>Material</h3><p>The marks, paper and physical texture that stay recognizable.</p></article>
          <article><span>03</span><h3>Restraint</h3><p>Negative instructions that prevent the look from drifting into generic AI polish.</p></article>
        </div>
      </section>
      <section className="related">
        <h2>Related visual languages</h2>
        <div>{related.map((item) => <Link href={`/styles/${item.slug}`} key={item.slug}>{item.name}<span>↗</span></Link>)}</div>
      </section>
    </div>
  );
}

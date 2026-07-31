import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUseCase, useCases } from "@/lib/use-cases";

export function generateStaticParams() { return useCases.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getUseCase((await params).slug); if (!item) return {};
  return { title: item.title, description: item.description, alternates: { canonical: `/use-cases/${item.slug}` }, openGraph: { title: item.title, description: item.description, images: [{ url: item.image }] } };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getUseCase((await params).slug); if (!item) notFound();
  const remix = `/generator?idea=${encodeURIComponent(item.idea)}&style=${item.style}&goal=${item.goal}&ratio=4%3A5`;
  const jsonLd = { "@context": "https://schema.org", "@type": "HowTo", name: item.title, description: item.description, step: item.points.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })) };
  return <div className="use-case-page shell"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div><Link className="back-link" href="/use-cases">← All workflows</Link><p className="eyebrow">{item.eyebrow}</p><h1>{item.title}</h1><p className="use-case-lead">{item.description}</p><Link className="button primary" href={remix}>Use this free workflow ↗</Link></div><div className="use-case-visual"><Image src={item.image} alt={`${item.title} example`} fill priority sizes="(max-width: 850px) 92vw, 48vw" /></div><section><p className="eyebrow">The calm workflow</p><h2>Lock what matters.<br />Change what moves.</h2><div className="recipe-parts">{item.points.map((point, index) => <article key={point}><span>0{index + 1}</span><h3>{point}</h3><p>{index === 0 ? "Start with the stable visual facts instead of rewriting everything." : index === 1 ? "The next image stays related without becoming a duplicate." : "Copy a version written for the model you already use."}</p></article>)}</div></section></div>;
}

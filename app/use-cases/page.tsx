import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useCases } from "@/lib/use-cases";

export const metadata: Metadata = { title: "AI illustration prompt workflows", description: "Start from a real task—not a wall of prompt parameters. Free workflows for storybooks, lesson diagrams, social posts and product visuals.", alternates: { canonical: "/use-cases" } };

export default function UseCasesPage() {
  return <div className="page-shell shell"><div className="page-intro"><p className="eyebrow">Start with the job</p><h1>Less prompting.<br /><em>More making.</em></h1><p>Choose the thing you need. DrawnKit handles the model syntax, visual restraint and reusable structure.</p></div><div className="use-case-grid">{useCases.map((item, index) => <Link href={`/use-cases/${item.slug}`} key={item.slug}><span className="use-case-image"><Image src={item.image} alt="" fill priority={index === 0} sizes="(max-width: 700px) 90vw, 45vw" /></span><p className="eyebrow">{item.eyebrow}</p><h2>{item.title}</h2><p>{item.description}</p><strong>Open workflow ↗</strong></Link>)}</div></div>;
}

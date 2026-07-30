import type { Metadata } from "next";
import { Generator } from "@/components/generator";
import { getStyle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Free hand-drawn AI prompt generator",
  description: "Turn one plain idea into a tactile, copy-ready AI illustration prompt. No signup required."
};

export default async function GeneratorPage({ searchParams }: { searchParams: Promise<{ style?: string }> }) {
  const requestedStyle = (await searchParams).style;
  const initialSlug = requestedStyle && getStyle(requestedStyle) ? requestedStyle : "childlike-coloring";
  return (
    <div className="page-shell shell">
      <div className="page-intro">
        <p className="eyebrow">Free prompt studio</p>
        <h1>Find the feeling.<br /><em>Keep the style.</em></h1>
        <p>Start with three complete recipes. Preview all twenty.</p>
      </div>
      <Generator initialSlug={initialSlug} />
    </div>
  );
}

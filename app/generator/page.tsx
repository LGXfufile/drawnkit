import type { Metadata } from "next";
import { Generator } from "@/components/generator";
import { getStyle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Free hand-drawn AI prompt generator",
  description: "Turn one plain idea into a model-ready illustration prompt with character consistency, format controls and a shareable remix link. No signup required.",
  alternates: { canonical: "/generator" }
};

const goals = ["story", "social", "explain", "product"] as const;
const models = ["ChatGPT Images", "Midjourney", "Gemini", "Flux"] as const;
const ratios = ["1:1", "4:5", "3:2", "16:9"] as const;

export default async function GeneratorPage({ searchParams }: { searchParams: Promise<{ style?: string; idea?: string; goal?: string; model?: string; ratio?: string }> }) {
  const query = await searchParams;
  const requestedStyle = query.style;
  const initialSlug = requestedStyle && getStyle(requestedStyle) ? requestedStyle : "childlike-coloring";
  const initialGoal = goals.find((item) => item === query.goal) || "story";
  const initialModel = models.find((item) => item === query.model) || "ChatGPT Images";
  const initialRatio = ratios.find((item) => item === query.ratio) || "4:5";
  return (
    <div className="page-shell shell">
      <div className="page-intro">
        <p className="eyebrow">Free prompt studio</p>
        <h1>Find the feeling.<br /><em>Keep the style.</em></h1>
        <p>Start with three complete recipes. Preview all twenty.</p>
      </div>
      <Generator initialSlug={initialSlug} initialIdea={query.idea?.slice(0, 240)} initialGoal={initialGoal} initialModel={initialModel} initialRatio={initialRatio} />
    </div>
  );
}

import type { Metadata } from "next";
import { Generator } from "@/components/generator";

export const metadata: Metadata = {
  title: "Free hand-drawn AI prompt generator",
  description: "Turn one plain idea into a tactile, copy-ready AI illustration prompt. No signup required."
};

export default function GeneratorPage() {
  return (
    <div className="page-shell shell">
      <div className="page-intro">
        <p className="eyebrow">Free prompt studio</p>
        <h1>Find the feeling.<br /><em>Keep the style.</em></h1>
        <p>Start with three complete recipes. Preview all twenty.</p>
      </div>
      <Generator />
    </div>
  );
}

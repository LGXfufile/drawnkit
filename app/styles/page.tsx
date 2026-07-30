import type { Metadata } from "next";
import { StyleGallery } from "@/components/style-gallery";

export const metadata: Metadata = {
  title: "20 hand-drawn AI illustration styles",
  description: "Browse 20 field-tested hand-drawn, storybook, ink, crayon and paper-craft AI prompt styles."
};

export default function StylesPage() {
  return (
    <div className="page-shell shell">
      <div className="page-intro">
        <p className="eyebrow">Complete visual library</p>
        <h1>Pick with your eyes.<br /><em>Not a manual.</em></h1>
        <p>Every card is a real result. Choose the feeling you want, then remix it with your own idea.</p>
      </div>
      <StyleGallery />
    </div>
  );
}

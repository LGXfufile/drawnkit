import type { Metadata } from "next";
import { CheckoutButton } from "@/components/checkout-button";

export const metadata: Metadata = { title: "Pricing", description: "Unlock all 20 DrawnKit visual recipes for a one-time founding price of $1." };

export default function PricingPage() {
  return (
    <div className="pricing-page shell">
      <div className="page-intro centered">
        <p className="eyebrow">Simple by design</p>
        <h1>One kit.<br /><em>One quiet dollar.</em></h1>
        <p>No subscription, no account maze, no credits that disappear.</p>
      </div>
      <section className="pricing-box">
        <div>
          <span className="founding-pill">Founding Style Kit · v1</span>
          <h2>A consistent visual language for every new idea.</h2>
          <ul>
            <li>20 complete hand-drawn recipes</li>
            <li>Four model adaptation guides</li>
            <li>Consistency and failure-mode checklist</li>
            <li>Markdown and JSON files</li>
            <li>Current major-version updates</li>
          </ul>
        </div>
        <div className="pricing-buy">
          <p className="price"><sup>$</sup>1</p>
          <p>One-time payment</p>
          <CheckoutButton />
          <small>Digital goods · Secure Waffo checkout</small>
        </div>
      </section>
      <section className="faq">
        <h2>Small questions, clear answers.</h2>
        <details><summary>Does DrawnKit generate images?</summary><p>DrawnKit generates precise, reusable prompts. Paste them into the image model you already use.</p></details>
        <details><summary>Can I use the images commercially?</summary><p>Your image usage depends on the terms of your chosen AI model. The DrawnKit recipes can be used for your own commercial creative work, but may not be resold as a prompt pack.</p></details>
        <details><summary>Will the styles work across every model?</summary><p>The visual language is model-independent. The kit includes small adaptations for ChatGPT Images, Midjourney, Gemini and Flux.</p></details>
        <details><summary>What if checkout is unavailable?</summary><p>The free studio remains available. No charge is made unless Waffo confirms the payment.</p></details>
      </section>
    </div>
  );
}

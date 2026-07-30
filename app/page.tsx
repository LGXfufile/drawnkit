import Image from "next/image";
import Link from "next/link";
import { CheckoutButton } from "@/components/checkout-button";
import { Generator } from "@/components/generator";
import { StyleGallery } from "@/components/style-gallery";
import { site } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DrawnKit",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    description: site.description,
    offers: { "@type": "Offer", price: "1.00", priceCurrency: "USD" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> 20 field-tested visual recipes</p>
          <h1>Give AI<br /><em>a steadier hand.</em></h1>
          <p className="hero-lead">Create warm, consistent illustrations for stories, lessons and products—without hours of prompt guessing.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/generator">Try it free <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="/pricing">All 20 styles · $1 <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-proof">
            <span><b>20</b> curated styles</span>
            <span><b>4</b> AI models</span>
            <span><b>0</b> signup</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Hand-drawn illustration examples">
          <article className="hero-card card-one">
            <Image src="/styles/nordic-storybook.jpg" alt="Nordic storybook fox illustration" fill sizes="(max-width: 800px) 70vw, 32vw" priority />
            <span>Nordic storybook</span>
          </article>
          <article className="hero-card card-two">
            <Image src="/styles/ink-wash.jpg" alt="Chinese ink wash illustration" fill sizes="(max-width: 800px) 46vw, 19vw" />
          </article>
          <article className="hero-card card-three">
            <Image src="/styles/crayon.jpg" alt="Child crayon illustration" fill sizes="(max-width: 800px) 42vw, 17vw" />
          </article>
          <span className="orbit-note">Less plastic.<br />More paper.</span>
        </div>
      </section>

      <section className="marquee" aria-label="Supported use cases">
        <div>STORIES <i>✦</i> LESSONS <i>✦</i> NEWSLETTERS <i>✦</i> PRODUCT EXPLAINERS <i>✦</i> CHARACTERS <i>✦</i> STORIES <i>✦</i> LESSONS</div>
      </section>

      <section className="problem shell">
        <div>
          <p className="eyebrow">Consistency, not complexity</p>
          <h2>Your ideas change.<br />Your visual language shouldn&apos;t.</h2>
        </div>
        <p>Generic prompt tools produce longer sentences. DrawnKit gives every series a repeatable palette, line weight, paper texture and emotional temperature.</p>
      </section>

      <section className="styles-section shell" id="styles">
        <div className="section-heading">
          <div><p className="eyebrow">The style library</p><h2>Twenty ways to feel human.</h2></div>
          <p>Each recipe is tested with real subjects—not invented from a list of fashionable words.</p>
        </div>
        <StyleGallery />
      </section>

      <section className="try-section shell">
        <Generator />
      </section>

      <section className="comparison shell">
        <div className="comparison-copy">
          <p className="eyebrow">The Founding Kit</p>
          <h2>Not twenty secret sentences.<br /><em>A visual system you can keep.</em></h2>
          <p>Use the same recipe across a whole story, course or product. Change the subject without losing the palette, texture and personality that made the first image work.</p>
          <ul>
            <li><span>01</span>20 complete, editable recipes</li>
            <li><span>02</span>ChatGPT, Midjourney, Gemini & Flux guidance</li>
            <li><span>03</span>Markdown + structured JSON download</li>
            <li><span>04</span>Consistency checklist and v1 updates</li>
          </ul>
        </div>
        <div className="price-card">
          <span className="founding-pill">Founding price</span>
          <p className="price"><sup>$</sup>1</p>
          <p>One quiet dollar.<br />No subscription. No account.</p>
          <CheckoutButton placement="home" />
          <small>Secure checkout by Waffo · Instant digital delivery</small>
        </div>
      </section>

      <section className="word-of-mouth">
        <div className="shell">
          <p className="eyebrow">Made to travel</p>
          <h2>A good style wants<br />to be passed on.</h2>
          <p>Every recipe can become a clean, shareable card. Friends can remix the look without seeing your private prompt—and discover their own visual voice.</p>
          <Link className="button light" href="/generator">Make something shareable <span>↗</span></Link>
        </div>
      </section>
    </>
  );
}

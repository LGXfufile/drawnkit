"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import { renderPrompt, styles } from "@/lib/styles";

const models = ["ChatGPT Images", "Midjourney", "Gemini", "Flux"] as const;
const goals = {
  story: { label: "Story series", hint: "A recurring character in a clear story moment", direction: "a single storybook scene, emotionally clear action, medium-wide composition, room for a recurring character" },
  social: { label: "Social post", hint: "A vertical, scroll-stopping visual", direction: "a vertical editorial composition with one immediate focal point and clean space for an optional caption, but no rendered text" },
  explain: { label: "Explain an idea", hint: "Simple enough to understand at a glance", direction: "a simple visual explanation with three readable beats, strong hierarchy and no written labels" },
  product: { label: "Show a product", hint: "A tactile hero image without AI gloss", direction: "a quiet product-hero composition with tactile material detail, accurate silhouette and an uncluttered backdrop" }
} as const;
const ratios = ["1:1", "4:5", "3:2", "16:9"] as const;
type Goal = keyof typeof goals;
type Model = typeof models[number];

function adaptPrompt(base: string, model: Model, ratio: string, direction: string, character: string) {
  const lock = character.trim()
    ? ` Keep the same recurring character identity in every image: ${character.trim()}. Treat those traits as immutable; only the action and setting may change.`
    : "";
  const shared = `${base} Composition goal: ${direction}.${lock} Avoid logos, watermarks, accidental typography, duplicated subjects, malformed hands and glossy AI-plastic surfaces.`;
  if (model === "Midjourney") return `${shared} --ar ${ratio} --stylize 150 --no watermark logo text duplicate glossy-3d`;
  if (model === "Flux") return `${shared} Aspect ratio ${ratio}. Precise subject relationships, physical material texture, restrained detail.`;
  if (model === "Gemini") return `Create an image in ${ratio} format. ${shared} Preserve the user's subject exactly; do not silently add objects.`;
  return `Create one ${ratio} image. ${shared} Follow the art direction faithfully and keep the result visibly handmade.`;
}

type RecentIdea = { subject: string; slug: string; goal: Goal };

type GeneratorProps = { initialSlug?: string; initialIdea?: string; initialGoal?: Goal; initialModel?: Model; initialRatio?: (typeof ratios)[number] };

export function Generator({ initialSlug = "childlike-coloring", initialIdea, initialGoal = "story", initialModel = models[0], initialRatio = "4:5" }: GeneratorProps) {
  const [slug, setSlug] = useState(initialSlug);
  const [subject, setSubject] = useState(initialIdea || "a tiny fox carrying a paper lantern through the rain");
  const [model, setModel] = useState<Model>(initialModel);
  const [goal, setGoal] = useState<Goal>(initialGoal);
  const [ratio, setRatio] = useState<(typeof ratios)[number]>(initialRatio);
  const [character, setCharacter] = useState("");
  const [recent, setRecent] = useState<RecentIdea[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "shared" | "manual">("idle");
  const selected = styles.find((style) => style.slug === slug) || styles[0];
  const output = useMemo(() => adaptPrompt(renderPrompt(selected.prompt, subject), model, ratio, goals[goal].direction, character), [selected, subject, model, ratio, goal, character]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("drawnkit-recent") || "[]") as RecentIdea[];
        setRecent(saved.slice(0, 3));
      } catch { /* Private browsing may disable local storage. */ }
    });
  }, []);

  function rememberIdea() {
    const next = [{ subject, slug, goal }, ...recent.filter((item) => item.subject !== subject)].slice(0, 3);
    setRecent(next);
    try { localStorage.setItem("drawnkit-recent", JSON.stringify(next)); } catch { /* Optional enhancement. */ }
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(output);
      setCopyState("copied");
      rememberIdea();
      track("prompt_copied", { style: selected.slug, model, goal, outcome: "copied" });
    } catch {
      setCopyState("manual");
      track("prompt_copied", { style: selected.slug, model, goal, outcome: "clipboard_blocked" });
    }
    window.setTimeout(() => setCopyState("idle"), 2200);
  }

  async function shareRecipe() {
    const url = new URL("/generator", window.location.origin);
    url.searchParams.set("idea", subject);
    url.searchParams.set("style", slug);
    url.searchParams.set("goal", goal);
    url.searchParams.set("model", model);
    url.searchParams.set("ratio", ratio);
    const usesNativeShare = typeof navigator.share === "function";
    try {
      if (usesNativeShare) await navigator.share({ title: `${selected.name} recipe — DrawnKit`, text: "Remix this hand-drawn AI image recipe", url: url.toString() });
      else await navigator.clipboard.writeText(url.toString());
      setCopyState("shared");
      track("recipe_shared", { style: selected.slug, goal, method: usesNativeShare ? "native" : "copy" });
    } catch { return; }
    window.setTimeout(() => setCopyState("idle"), 2200);
  }

  return (
    <section className="generator-panel" aria-label="Prompt generator">
      <div className="generator-controls">
        <p className="eyebrow">Your visual system</p>
        <h2>One idea.<br />A steadier hand.</h2>
        <fieldset className="goal-picker">
          <legend>What are you making?</legend>
          <div>{Object.entries(goals).map(([key, item]) => <button key={key} className={goal === key ? "goal active" : "goal"} type="button" onClick={() => setGoal(key as Goal)} aria-pressed={goal === key}><strong>{item.label}</strong><span>{item.hint}</span></button>)}</div>
        </fieldset>
        <label>
          Describe it in your own words
          <textarea value={subject} onChange={(event) => setSubject(event.target.value.slice(0, 240))} rows={3} placeholder="A sleepy bear opening a tiny bakery…" />
          <small>{subject.length}/240</small>
        </label>
        <div className="starter-row" aria-label="Quick starters">
          <span>Try:</span>
          <button type="button" onClick={() => setSubject("the same shy rabbit discovering a glowing seed in a moonlit garden")}>Bedtime story</button>
          <button type="button" onClick={() => { setGoal("product"); setSubject("a handmade ceramic coffee cup for a quiet morning campaign"); }}>Product post</button>
        </div>
        {recent.length > 0 && <div className="recent-row"><span>Recent</span>{recent.map((item) => <button type="button" key={item.subject} onClick={() => { setSubject(item.subject); setSlug(item.slug); setGoal(item.goal); }}>{item.subject}</button>)}</div>}
        <div className="control-grid three">
          <label>Style<select value={slug} onChange={(event) => setSlug(event.target.value)}>{styles.map((style) => <option key={style.slug} value={style.slug}>{style.name}{style.free ? "" : " · Kit"}</option>)}</select></label>
          <label>Model<select value={model} onChange={(event) => setModel(event.target.value as Model)}>{models.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Format<select value={ratio} onChange={(event) => setRatio(event.target.value as typeof ratio)}>{ratios.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <details className="consistency-lock">
          <summary>Keep a character consistent <span>Optional</span></summary>
          <label>Unchanging character traits<input value={character} onChange={(event) => setCharacter(event.target.value.slice(0, 180))} placeholder="Round fox, rust-red fur, green raincoat, blue satchel" /></label>
          <p>We lock identity, clothing and palette while letting the scene change.</p>
        </details>
        {!selected.free && <p className="kit-notice">This full recipe belongs to the Founding Kit. Preview it here; unlock all 20 for $1.<Link href="/pricing"> See the kit →</Link></p>}
      </div>
      <div className="generator-result">
        <div className="result-art"><Image src={selected.image} alt={`${selected.name} preview`} fill sizes="(max-width: 900px) 92vw, 44vw" priority /><span>{selected.name} · {goals[goal].label}</span></div>
        <div className="prompt-output">
          <div><span>Ready for {model}</span><span>{ratio} · {output.length} characters</span></div>
          <p>{selected.free ? output : `${output.slice(0, 220)}…`}</p>
          {selected.free ? <div className="result-actions"><button className="button dark" type="button" onClick={copyPrompt}>{copyState === "copied" ? "Copied beautifully ✓" : copyState === "manual" ? "Select the text to copy" : "Copy prompt"}</button><button className="share-button" type="button" onClick={shareRecipe}>Share recipe ↗</button></div> : <Link className="button dark" href="/pricing">Unlock this recipe — $1</Link>}
          <p className="privacy-note">Saved only in this browser. Your idea is never added to a public gallery.</p>
        </div>
      </div>
      <div className={copyState !== "idle" ? "toast show" : "toast"} role="status">{copyState === "manual" ? "Clipboard blocked. Select the prompt manually." : copyState === "shared" ? "Recipe ready to travel." : "Copied. Now make something lovely."}</div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { renderPrompt, styles } from "@/lib/styles";

const models = ["ChatGPT Images", "Midjourney", "Gemini", "Flux"];

export function Generator({ initialSlug = "childlike-coloring" }: { initialSlug?: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const [subject, setSubject] = useState("a tiny fox carrying a paper lantern through the rain");
  const [model, setModel] = useState(models[0]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const selected = styles.find((style) => style.slug === slug) || styles[0];
  const output = useMemo(() => renderPrompt(selected.prompt, subject), [selected, subject]);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(output);
      setCopyState("copied");
    } catch {
      setCopyState("manual");
    }
    window.setTimeout(() => setCopyState("idle"), 2200);
  }

  return (
    <section className="generator-panel" aria-label="Prompt generator">
      <div className="generator-controls">
        <p className="eyebrow">Your visual system</p>
        <h2>One idea.<br />A steadier hand.</h2>
        <label>
          What should we draw?
          <textarea value={subject} onChange={(event) => setSubject(event.target.value.slice(0, 240))} rows={3} />
          <small>{subject.length}/240</small>
        </label>
        <div className="control-grid">
          <label>
            Style
            <select value={slug} onChange={(event) => setSlug(event.target.value)}>
              {styles.map((style) => <option key={style.slug} value={style.slug}>{style.name}{style.free ? "" : " · Kit"}</option>)}
            </select>
          </label>
          <label>
            Model
            <select value={model} onChange={(event) => setModel(event.target.value)}>
              {models.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        {!selected.free && (
          <p className="kit-notice">
            This full recipe belongs to the Founding Kit. You can preview it here; unlock all 20 for $1.
            <Link href="/pricing"> See the kit →</Link>
          </p>
        )}
      </div>
      <div className="generator-result">
        <div className="result-art">
          <Image src={selected.image} alt={`${selected.name} preview`} fill sizes="(max-width: 900px) 92vw, 44vw" priority />
          <span>{selected.name}</span>
        </div>
        <div className="prompt-output">
          <div><span>Optimized for {model}</span><span>{output.length} characters</span></div>
          <p>{selected.free ? output : `${output.slice(0, 190)}…`}</p>
          {selected.free ? (
            <button className="button dark" type="button" onClick={copyPrompt}>
              {copyState === "copied" ? "Copied beautifully ✓" : copyState === "manual" ? "Select the text to copy" : "Copy prompt"}
            </button>
          ) : (
            <Link className="button dark" href="/pricing">Unlock this recipe — $1</Link>
          )}
        </div>
      </div>
      <div className={copyState !== "idle" ? "toast show" : "toast"} role="status">
        {copyState === "manual" ? "Clipboard access is blocked. Select the prompt text manually." : "Copied. Now make something lovely."}
      </div>
    </section>
  );
}

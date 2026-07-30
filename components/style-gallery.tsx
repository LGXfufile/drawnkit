"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { styles } from "@/lib/styles";

export function StyleGallery() {
  const categories = ["All", ...new Set(styles.map((style) => style.category))];
  const [active, setActive] = useState("All");
  const visible = useMemo(
    () => active === "All" ? styles : styles.filter((style) => style.category === active),
    [active]
  );

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter styles">
        {categories.map((category) => (
          <button
            className={active === category ? "filter active" : "filter"}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="style-grid">
        {visible.map((style, index) => (
          <Link className="style-card" href={`/styles/${style.slug}`} key={style.slug}>
            <span className="style-image">
              <Image
                src={style.image}
                alt={`${style.name} AI illustration example`}
                fill
                sizes="(max-width: 720px) 90vw, (max-width: 1100px) 44vw, 29vw"
                priority={index < 2}
              />
              <span className="access-pill">{style.free ? "Free" : "Kit"}</span>
            </span>
            <span className="style-copy">
              <span className="style-category">{style.category}</span>
              <strong>{style.name}</strong>
              <span>{style.description}</span>
              <i aria-hidden="true">↗</i>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

export type StyleRecipe = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  accent: string;
  free: boolean;
  prompt: string;
};

export const styles: StyleRecipe[] = [
  {
    slug: "childlike-coloring",
    name: "Childlike Coloring",
    category: "Human & imperfect",
    description: "Shaky grown-up outlines, colored with the fearless honesty of a child.",
    image: "/styles/childlike-coloring.jpg",
    accent: "#ff6b48",
    free: true,
    prompt: "A real handmade children's coloring-page drawing of {{subject}} on white paper. Thick, shaky black outlines drawn by an adult, then colored by a 5–8 year-old child. Uneven pressure, visible white gaps, color crossing the lines, charming mistakes. Not a polished digital illustration."
  },
  {
    slug: "restrained-coloring",
    name: "Restrained Coloring",
    category: "Human & imperfect",
    description: "Quiet white space, four muted colors and one warm red accent.",
    image: "/styles/childlike-coloring.jpg",
    accent: "#d65f46",
    free: false,
    prompt: "A restrained handmade coloring drawing of {{subject}} on warm white paper. Shaky repeated outlines, no more than four muted colors, generous negative space and exactly one orange-red accent. Imperfect child coloring, never commercial vector art."
  },
  {
    slug: "minimal-stick-story",
    name: "Minimal Stick Story",
    category: "Explain & teach",
    description: "Fine black lines and calm, sequential storytelling.",
    image: "/styles/bean-doodle.jpg",
    accent: "#f06436",
    free: true,
    prompt: "A minimal black-and-white stick-figure explainer about {{subject}} on warm off-white paper. Fine outline-only drawing, rounded panels, clear visual sequence, understated humor and abundant breathing room. No fills, shadows or visual clutter."
  },
  {
    slug: "child-crayon",
    name: "Child Crayon",
    category: "Human & imperfect",
    description: "A gloriously crooked drawing by a real five-year-old.",
    image: "/styles/crayon.jpg",
    accent: "#f0bd35",
    free: false,
    prompt: "A real 5-year-old child's wax-crayon drawing of {{subject}} on printer paper. Wrong proportions, shaky outlines, asymmetric forms, sparse messy coloring and large untouched white patches. Avoid polished, cute, symmetric or professional illustration."
  },
  {
    slug: "raw-kid-scrawl",
    name: "Raw Kid Scrawl",
    category: "Human & imperfect",
    description: "Potato bodies, stick limbs and delightfully uncertain marks.",
    image: "/styles/crayon.jpg",
    accent: "#d86342",
    free: false,
    prompt: "A complete drawing of {{subject}} made unaided by a 5-year-old: potato-shaped bodies, dot eyes, stick limbs, broken trembling lines, repeated marks, four muted colors and one orange accent. Lots of blank paper. Not storybook polish."
  },
  {
    slug: "healing-watercolor",
    name: "Healing Watercolor",
    category: "Storybook",
    description: "Soft hand-painted light with a calm cinematic heart.",
    image: "/styles/nordic-storybook.jpg",
    accent: "#ef9b54",
    free: false,
    prompt: "A hand-painted watercolor animation illustration of {{subject}}. One clear focal subject, simplified background, calm negative space, delicate linework and warm cinematic light. Gentle, tactile and human; not 3D, glossy or cluttered."
  },
  {
    slug: "bean-doodle-infographic",
    name: "Bean Doodle Infographic",
    category: "Explain & teach",
    description: "A tiny black bean character turns ideas into memorable diagrams.",
    image: "/styles/bean-doodle.jpg",
    accent: "#f06436",
    free: false,
    prompt: "A hand-drawn black-marker infographic explaining {{subject}} on off-white paper. Stacked panels featuring the same round black bean character, outline-only objects, curved arrows and one orange accent. Clear, playful and immediately readable."
  },
  {
    slug: "bad-paint-doodle",
    name: "Bad Paint Doodle",
    category: "Human & imperfect",
    description: "Mouse-drawn, badly proportioned and strangely impossible to ignore.",
    image: "/styles/crayon.jpg",
    accent: "#ef4136",
    free: false,
    prompt: "An intentionally awful mouse-drawn paint doodle of {{subject}}. Wobbly broken lines, absurd proportions, jagged pixel edges and coloring outside every boundary. Funny because it is painfully sincere. No gradients, professional lighting or polish."
  },
  {
    slug: "ballpoint-scribble",
    name: "Ballpoint Scribble",
    category: "Line & ink",
    description: "One restless blue-black line searching for the subject.",
    image: "/styles/inked-storybook.jpg",
    accent: "#385a86",
    free: false,
    prompt: "A spontaneous blue-black ballpoint-pen scribble drawing of {{subject}}. Many fast looping construction lines, open contours and density-based shading, as if captured in one uninterrupted sitting. No clean vector edges or digital gradients."
  },
  {
    slug: "real-crayon-paper",
    name: "Real Crayon Paper",
    category: "Human & imperfect",
    description: "Waxy buildup, wrinkled paper and the evidence of a real hand.",
    image: "/styles/childlike-coloring.jpg",
    accent: "#ed4437",
    free: false,
    prompt: "A phone photograph of a real wax-crayon drawing of {{subject}} on slightly wrinkled printer paper. Uneven pressure, wax buildup, overflow past outlines and 50–65% of the paper left unfilled. Never a digital illustration."
  },
  {
    slug: "ink-wash",
    name: "Ink Wash",
    category: "Line & ink",
    description: "Confident brushwork, breathing paper and a single vermilion seal.",
    image: "/styles/ink-wash.jpg",
    accent: "#b63728",
    free: true,
    prompt: "A traditional expressive Chinese ink-wash painting of {{subject}} on raw xuan paper. Dry flying-white strokes, wet ink diffusion, five natural ink densities and generous untouched space, finished with one small vermilion seal. No 3D or gray filter."
  },
  {
    slug: "retro-pixel",
    name: "Retro Pixel",
    category: "Graphic craft",
    description: "A tiny 16-color world with hard edges and no apologies.",
    image: "/styles/paper-folk.jpg",
    accent: "#f4ca58",
    free: false,
    prompt: "Authentic 8-bit / 16-bit pixel art of {{subject}} using a strict 16-color palette. Hard square staircase edges, grid-consistent pixels and dithering instead of gradients. Zero antialiasing, blur or high-resolution filter effects."
  },
  {
    slug: "emotional-story-sketch",
    name: "Emotional Story Sketch",
    category: "Storybook",
    description: "Loose indigo lines, silence and one emotionally charged orange detail.",
    image: "/styles/emo-sketch.jpg",
    accent: "#f3703d",
    free: false,
    prompt: "An emotional narrative sketch of {{subject}} using loose searching indigo lines on white paper. Most areas remain uncolored. Exactly one meaningful object is vivid orange, with only a whisper of watercolor elsewhere. Honest, restrained and deeply human."
  },
  {
    slug: "midcentury-gouache",
    name: "Mid-century Gouache",
    category: "Storybook",
    description: "Warm 1950s concept art with visible pencil underneath.",
    image: "/styles/nordic-storybook.jpg",
    accent: "#ef7743",
    free: false,
    prompt: "1950s animation concept art of {{subject}}, hand painted in gouache and watercolor on warm cream paper. Visible pencil construction, simplified graphic shapes, soft high-key glow and one orange–blue complementary accent. No 3D."
  },
  {
    slug: "sunlit-storybook",
    name: "Sunlit Storybook",
    category: "Storybook",
    description: "Soft flyaway hair, expressive eyes and a warm narrative glow.",
    image: "/styles/nordic-storybook.jpg",
    accent: "#e7773d",
    free: false,
    prompt: "Modern animation visual-development gouache of {{subject}}. Expressive eyes, clustered soft hair with loose flyaways, teal-and-orange palette, warm daylight, visible dry-brush texture and cream paper edges. Storybook concept art, not 3D."
  },
  {
    slug: "nordic-paper-folk",
    name: "Nordic Paper Folk",
    category: "Graphic craft",
    description: "Layered cardstock, deep physical shadows and folk-art warmth.",
    image: "/styles/paper-folk.jpg",
    accent: "#e6b84c",
    free: false,
    prompt: "A layered Nordic paper sculpture of {{subject}}. Scandinavian folk shapes cut from textured cardstock, embossed edges, curled quilling spirals and deep physical cast shadows in warm jewel tones. Tactile handmade craft, never flat vector."
  },
  {
    slug: "nordic-storybook",
    name: "Nordic Storybook",
    category: "Storybook",
    description: "Denim blue, muted mustard and timeless Scandinavian quiet.",
    image: "/styles/nordic-storybook.jpg",
    accent: "#d4a936",
    free: false,
    prompt: "A Scandinavian children's storybook gouache of {{subject}} on warm textured paper. Generous negative space, denim blue and muted mustard, tiny dot eyes, loose flyaway hairs and one pale blue oval ground shadow. Timeless, soft and unforced."
  },
  {
    slug: "soft-vinyl-character",
    name: "Soft Vinyl Character",
    category: "Graphic craft",
    description: "A sleepy, oversized-nose art toy with deadpan charm.",
    image: "/styles/paper-folk.jpg",
    accent: "#e9a58d",
    free: false,
    prompt: "A modern soft-vinyl art-toy character of {{subject}} with matte tactile material, an oversized drooping tube nose, sleepy half-lidded eyes, a tiny straight mouth, oversized head and chunky shoes. Warm limited palette and soft studio light."
  },
  {
    slug: "spotlight-gouache",
    name: "Spotlight Gouache",
    category: "Storybook",
    description: "A character portrait held by a single painted halo.",
    image: "/styles/emo-sketch.jpg",
    accent: "#de6d3f",
    free: false,
    prompt: "A digital gouache animation portrait of {{subject}} on a full-frame painted ground. One soft spotlight halo, exaggerated proportions, large expressive eyes, an airbrushed face against dry-brushed edges and a restrained blue-orange palette."
  },
  {
    slug: "inked-storybook",
    name: "Inked Storybook",
    category: "Line & ink",
    description: "Visible construction lines, transparent color and lively pen edges.",
    image: "/styles/inked-storybook.jpg",
    accent: "#d77a60",
    free: false,
    prompt: "An inked storybook portrait of {{subject}} with visible black-ink construction lines, lively pen contours, individual flyaway hairs, luminous eyes, transparent watercolor color and a soft wash framed by rough cream paper edges."
  }
];

export function getStyle(slug: string) {
  return styles.find((style) => style.slug === slug);
}

export function renderPrompt(recipe: string, subject: string) {
  return recipe.replaceAll("{{subject}}", subject.trim() || "a quiet little fox carrying a paper lantern");
}

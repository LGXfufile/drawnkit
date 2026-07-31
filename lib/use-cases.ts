export const useCases = [
  {
    slug: "childrens-book-illustration",
    title: "Children’s book illustration prompts",
    eyebrow: "For authors, parents & teachers",
    description: "Build a gentle picture-book series without letting the main character change clothes, colors or personality between pages.",
    idea: "the same shy rabbit discovering a glowing seed in a moonlit garden",
    style: "nordic-storybook",
    goal: "story",
    image: "/styles/nordic-storybook.jpg",
    points: ["Lock the character’s visible traits once", "Change only the action and setting per page", "Adapt the same recipe for four image models"]
  },
  {
    slug: "lesson-diagram",
    title: "Simple lesson diagram prompts",
    eyebrow: "For classrooms & explainers",
    description: "Turn one difficult idea into a calm, hand-drawn visual sequence that can be understood before anyone reads a paragraph.",
    idea: "how a seed becomes a sunflower in three simple visual steps",
    style: "minimal-stick-story",
    goal: "explain",
    image: "/styles/bean-doodle.jpg",
    points: ["One clear idea per frame", "No accidental AI typography", "Readable hierarchy with generous space"]
  },
  {
    slug: "social-media-illustration",
    title: "Hand-drawn social media prompts",
    eyebrow: "For newsletters & social posts",
    description: "Create a vertical visual with one focal point, room for your real caption and none of the glossy sameness of generic AI art.",
    idea: "a tired creative finding one small bright idea on a rainy Monday",
    style: "emotional-story-sketch",
    goal: "social",
    image: "/styles/emo-sketch.jpg",
    points: ["Designed for a 4:5 feed format", "Keeps text out of the generated image", "Shareable recipe anyone can remix"]
  },
  {
    slug: "product-hero-sketch",
    title: "Tactile product hero prompts",
    eyebrow: "For makers & small shops",
    description: "Show a product as a quiet handmade hero while explicitly protecting its silhouette, palette and material character.",
    idea: "a handmade ceramic coffee cup for a quiet morning campaign",
    style: "inked-storybook",
    goal: "product",
    image: "/styles/inked-storybook.jpg",
    points: ["Accurate silhouette before decoration", "No invented logos or packaging text", "A clean backdrop ready for real copy"]
  }
] as const;

export function getUseCase(slug: string) { return useCases.find((item) => item.slug === slug); }

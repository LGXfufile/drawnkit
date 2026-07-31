export const foundingKit = {
  name: "DrawnKit Founding Kit",
  version: 1,
  license: "Personal and commercial use. Do not resell the kit itself.",
  workflow: [
    "Choose the closest visual style in DrawnKit.",
    "Replace the subject, mood, palette, and composition placeholders.",
    "Generate once, then change only one variable per iteration.",
    "Save the winning prompt as your reusable visual recipe."
  ],
  promptFormula: "[subject] + [action] + [setting] + [style] + [materials] + [palette] + [composition] + [lighting] + [constraints]",
  negativePrompt: "photorealistic, glossy 3D, watermark, logo, unreadable text, extra fingers, duplicated objects, cluttered composition",
  proTips: [
    "Name a physical medium to make the image feel authored.",
    "Use two dominant colors and one accent for a coherent palette.",
    "Describe the camera distance before adding decorative detail.",
    "For a series, keep the palette, line quality, and aspect ratio fixed."
  ]
} as const;

export function foundingKitMarkdown() {
  return `# ${foundingKit.name}\n\nVersion ${foundingKit.version}\n\n## License\n${foundingKit.license}\n\n## Four-step workflow\n${foundingKit.workflow.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n## Prompt formula\n\`${foundingKit.promptFormula}\`\n\n## Negative prompt\n${foundingKit.negativePrompt}\n\n## Pro tips\n${foundingKit.proTips.map((item) => `- ${item}`).join("\n")}\n`;
}

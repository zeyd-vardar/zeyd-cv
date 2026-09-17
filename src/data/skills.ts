import type { LocalizedText } from "../types/portfolio";

interface SkillGroup {
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: { tr: "Web geliştirme", en: "Web development" },
    description: {
      tr: "Fikrin tarayıcıda hayat bulduğu yer.",
      en: "Where ideas come to life in the browser.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },
  {
    title: { tr: "Mobil geliştirme", en: "Mobile development" },
    description: {
      tr: "Küçük ekranlar, anlamlı deneyimler.",
      en: "Small screens, meaningful experiences.",
    },
    technologies: ["Flutter", "Dart"],
  },
  {
    title: { tr: "Araçlar & iş akışı", en: "Tools & workflow" },
    description: {
      tr: "Düzenli, sürdürülebilir bir çalışma biçimi.",
      en: "A thoughtful, maintainable way of working.",
    },
    technologies: ["Git", "GitHub", "VS Code", "Vite"],
  },
];

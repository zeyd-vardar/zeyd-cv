export type Language = "tr" | "en";
export type Theme = "light" | "dark";
export type LocalizedText = Record<Language, string>;
export type SectionId = "home" | "about" | "projects" | "skills" | "contact";

export interface Project {
  id: string;
  title: string;
  description: LocalizedText;
  category: LocalizedText;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  status: "concept" | "in-progress" | "live";
  visual: "editorial" | "workspace" | "mobile";
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<
  Record<keyof ContactFormData, "required" | "email" | "short" | "long">
>;

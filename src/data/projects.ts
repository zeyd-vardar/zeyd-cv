import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: "folio",
    title: "Folio Studio",
    description: {
      tr: "Tipografi ve boşluğun ön planda olduğu, yaratıcı bir stüdyo için web arayüzü konsepti.",
      en: "A web interface concept for a creative studio, built around typography and thoughtful spacing.",
    },
    category: { tr: "WEB TASARIM & GELİŞTİRME", en: "WEB DESIGN & DEVELOPMENT" },
    technologies: ["React", "TypeScript", "CSS"],
    status: "concept",
    visual: "editorial",
  },
  {
    id: "daylight",
    title: "Daylight",
    description: {
      tr: "Günü sadeleştiren bir görev yöneticisi. Odaklanmayı kolaylaştıran bir ürün arayüzü çalışması.",
      en: "A calmer way to organize the day. A product interface exploration designed to encourage focus.",
    },
    category: { tr: "WEB UYGULAMASI", en: "WEB APPLICATION" },
    technologies: ["React", "TypeScript"],
    status: "in-progress",
    visual: "workspace",
  },
  {
    id: "roam",
    title: "Roam",
    description: {
      tr: "Yeni yerleri keşfetmek için tasarlanan, sade ve erişilebilir bir mobil uygulama konsepti.",
      en: "A simple, accessible mobile app concept for discovering new places and everyday adventures.",
    },
    category: { tr: "MOBİL UYGULAMA", en: "MOBILE APPLICATION" },
    technologies: ["Flutter", "Dart"],
    status: "concept",
    visual: "mobile",
  },
];

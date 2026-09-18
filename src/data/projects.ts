import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: "soccer-chat",
    title: "SoccerChat",
    description: {
      tr: "Maç odaları ve gerçek zamanlı sohbeti bir araya getiren futbol topluluğu uygulaması. Web demosu, örnek maç verileriyle kayıt olmadan keşfedilebilir.",
      en: "A football community app combining match rooms and real-time chat. The web demo can be explored without registration using sample match data.",
    },
    category: { tr: "WEB & MOBİL UYGULAMA", en: "WEB & MOBILE APP" },
    technologies: ["Flutter", "Dart", "Supabase", "Riverpod"],
    liveUrl: "https://zeyd-vardar.github.io/soccer-chat/",
    githubUrl: "https://github.com/zeyd-vardar/soccer-chat",
    status: "live",
    visual: "mobile",
  },
  {
    id: "kahve-cesitleri",
    title: "İçimlik",
    description: {
      tr: "Kahve, çay ve farklı kafe içeceklerini tarifleriyle keşfetmeyi sağlayan iki dilli rehber. Arama, filtreleme, karşılaştırma ve porsiyon hesaplama sunar.",
      en: "A bilingual guide to coffee, tea and other café drinks with recipes, search, filters, comparisons and serving calculations.",
    },
    category: { tr: "İÇECEK & TARİF REHBERİ", en: "DRINK & RECIPE GUIDE" },
    technologies: ["React", "TypeScript", "Vinext", "Tailwind CSS"],
    liveUrl: "https://zeyd-vardar.github.io/kahve-cesitleri/",
    githubUrl: "https://github.com/zeyd-vardar/kahve-cesitleri",
    status: "live",
    visual: "workspace",
  },
  {
    id: "renk-kacisi",
    title: "Renk Kaçışı",
    description: {
      tr: "Topu sürükleyerek aynı renkteki engellerle eşleştiğiniz, diğer renklerden kaçındığınız refleks oyunu. Tarayıcıda oynanabilir ve yüksek skoru cihazda saklar.",
      en: "A reflex game where you drag a ball to match obstacles of the same color and avoid the others. Play in the browser and save your high score locally.",
    },
    category: { tr: "WEB & MOBİL OYUN", en: "WEB & MOBILE GAME" },
    technologies: ["Flutter", "Dart", "Flame"],
    liveUrl: "https://zeyd-vardar.github.io/renk-kacisi/",
    githubUrl: "https://github.com/zeyd-vardar/renk-kacisi",
    status: "live",
    visual: "mobile",
  },
  {
    id: "acar-muhendislik",
    title: "Açar Mühendislik",
    description: {
      tr: "Trabzon’da doğalgaz ve mekanik tesisat hizmetleri sunan Açar Mühendislik için kurumsal web sitesi. Hizmetler, tamamlanan projeler ve iletişim bilgilerini bir araya getirir.",
      en: "A corporate website for Açar Mühendislik, a natural gas and mechanical installation company in Trabzon. It brings together services, completed projects and contact details.",
    },
    category: { tr: "KURUMSAL WEB SİTESİ", en: "CORPORATE WEBSITE" },
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://www.acarmuhendis.com/",
    githubUrl: "https://github.com/zeyd-vardar/acar-muhendislik",
    status: "live",
    visual: "editorial",
  },
];

import { useEffect, useState } from "react";
import { translations } from "../data/translations";
import type { Language, Theme } from "../types/portfolio";
import { readPreference, writePreference } from "../utils/storage";

export function usePreferences() {
  const [language, setLanguage] = useState<Language>("tr");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedLanguage = readPreference("portfolio-language");
      const savedTheme = readPreference("portfolio-theme");

      if (savedLanguage === "tr" || savedLanguage === "en") {
        setLanguage(savedLanguage);
      }
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
  }, [language, theme]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    writePreference("portfolio-language", nextLanguage);
  }

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    writePreference("portfolio-theme", nextTheme);
  }

  return { language, theme, changeLanguage, toggleTheme, text: translations[language] };
}

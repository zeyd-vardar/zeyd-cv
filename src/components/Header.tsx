import type { Translation } from "../data/translations";
import type { Language, Theme } from "../types/portfolio";

interface HeaderProps {
  text: Translation;
  language: Language;
  theme: Theme;
  onLanguageChange: (language: Language) => void;
  onThemeToggle: () => void;
}

export function Header({ text, language, theme, onLanguageChange, onThemeToggle }: HeaderProps) {
  return (
    <header className="header">
      <span>{text.common.role}</span>
      <div className="header-controls">
        <div className="language-toggle" role="group" aria-label={text.common.language}>
          {(["tr", "en"] as const).map((option) => (
            <button
              key={option}
              aria-pressed={language === option}
              lang={option}
              onClick={() => onLanguageChange(option)}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="control-divider" />
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={theme === "light" ? text.common.darkTheme : text.common.lightTheme}
        >
          <span aria-hidden="true">{theme === "light" ? "◐" : "☼"}</span>
        </button>
      </div>
    </header>
  );
}

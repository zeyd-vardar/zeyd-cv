import { useEffect, useRef, useState } from "react";
import { personalInfo } from "../data/personalInfo";
import { sectionIds } from "../data/sections";
import type { Translation } from "../data/translations";
import type { Language, SectionId } from "../types/portfolio";

interface SidebarProps {
  activeSection: SectionId;
  language: Language;
  text: Translation;
  onNavigate: (section: SectionId) => void;
}

export function Sidebar({ activeSection, language, text, onNavigate }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function navigate(section: SectionId) {
    onNavigate(section);
    setMenuOpen(false);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-caption">{text.common.portfolio}</div>
      <button
        ref={menuButtonRef}
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? text.common.closeMenu : text.common.menu}
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
      </button>
      <nav
        id="main-navigation"
        className={menuOpen ? "is-open" : ""}
        aria-label={text.common.navigation}
      >
        {sectionIds.map((section) => (
          <a
            className={`nav-link ${activeSection === section ? "active" : ""}`}
            href={`#${section}`}
            key={section}
            aria-current={activeSection === section ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              navigate(section);
            }}
          >
            {text.navigation[section]}
            <span className="nav-dot" />
          </a>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <span className="availability">
          <i />
          {text.common.available}
        </span>
        <p>
          {personalInfo.location[language]}
          <br />
          {personalInfo.coordinates}
        </p>
      </div>
    </aside>
  );
}

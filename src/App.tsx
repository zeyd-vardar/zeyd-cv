"use client";

import type { ReactNode } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { sectionIds } from "./data/sections";
import { usePreferences } from "./hooks/usePreferences";
import { useSectionNavigation } from "./hooks/useSectionNavigation";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Home } from "./sections/Home";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import type { SectionId } from "./types/portfolio";

export function App() {
  const { language, theme, text, changeLanguage, toggleTheme } = usePreferences();
  const { activeSection, activeIndex, isDesktop, containerRef, goToSection, previous, next } =
    useSectionNavigation();
  const panels: Record<SectionId, ReactNode> = {
    home: <Home text={text} onNavigate={goToSection} />,
    about: <About text={text} onContact={() => goToSection("contact")} />,
    projects: <Projects text={text} language={language} />,
    skills: <Skills text={text} language={language} />,
    contact: <Contact text={text} />,
  };

  return (
    <div className="portfolio">
      <a
        className="skip-link"
        href={`#${activeSection}`}
        onClick={(event) => {
          event.preventDefault();
          document.getElementById(activeSection)?.focus({ preventScroll: true });
        }}
      >
        {text.common.skip}
      </a>
      <Sidebar
        activeSection={activeSection}
        language={language}
        text={text}
        onNavigate={goToSection}
      />
      <div className="workspace">
        <Header
          text={text}
          language={language}
          theme={theme}
          onLanguageChange={changeLanguage}
          onThemeToggle={toggleTheme}
        />
        <main ref={containerRef} className="panels" tabIndex={-1}>
          {sectionIds.map((section) => (
            <section
              key={section}
              id={section}
              className="panel"
              aria-label={text.navigation[section]}
              tabIndex={-1}
              inert={isDesktop && activeSection !== section}
            >
              {panels[section]}
            </section>
          ))}
        </main>
        <Footer activeIndex={activeIndex} text={text} onPrevious={previous} onNext={next} />
      </div>
    </div>
  );
}

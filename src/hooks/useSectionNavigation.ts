import { useCallback, useEffect, useRef, useState } from "react";
import { desktopMediaQuery, sectionIds } from "../data/sections";
import type { SectionId } from "../types/portfolio";

function sectionFromHash(): SectionId {
  const hash = window.location.hash.slice(1);
  return sectionIds.find((section) => section === hash) ?? "home";
}

export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const activeRef = useRef<SectionId>("home");

  const scrollToSection = useCallback((section: SectionId, behavior: ScrollBehavior) => {
    const container = containerRef.current;
    const panel = document.getElementById(section);
    if (!container || !panel) return;

    if (window.matchMedia(desktopMediaQuery).matches) {
      container.scrollTo({ left: sectionIds.indexOf(section) * container.clientWidth, behavior });
    } else if (section === "home") {
      window.scrollTo({ top: 0, behavior });
    } else {
      panel.scrollIntoView({ behavior, block: "start" });
    }
  }, []);

  const goToSection = useCallback(
    (section: SectionId) => {
      activeRef.current = section;
      setActiveSection(section);
      window.history.pushState(null, "", `#${section}`);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollToSection(section, reducedMotion ? "instant" : "smooth");
    },
    [scrollToSection],
  );

  useEffect(() => {
    const query = window.matchMedia(desktopMediaQuery);
    const initialSection = sectionFromHash();
    activeRef.current = initialSection;
    const initialFrame = requestAnimationFrame(() => {
      setActiveSection(initialSection);
      setIsDesktop(query.matches);
      scrollToSection(initialSection, "instant");
    });

    function handleResize() {
      setIsDesktop(query.matches);
      requestAnimationFrame(() => scrollToSection(activeRef.current, "instant"));
    }
    function handleHistory() {
      const section = sectionFromHash();
      activeRef.current = section;
      setActiveSection(section);
      scrollToSection(section, "instant");
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handleHistory);
    window.addEventListener("hashchange", handleHistory);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handleHistory);
      window.removeEventListener("hashchange", handleHistory);
    };
  }, [scrollToSection]);

  useEffect(() => {
    if (isDesktop) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const section = visible.target.id as SectionId;
          activeRef.current = section;
          setActiveSection(section);
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const panel = document.getElementById(id);
      if (panel) observer.observe(panel);
    });
    return () => observer.disconnect();
  }, [isDesktop]);

  const activeIndex = sectionIds.indexOf(activeSection);
  return {
    activeSection,
    activeIndex,
    isDesktop,
    containerRef,
    goToSection,
    previous: () => goToSection(sectionIds[Math.max(0, activeIndex - 1)]),
    next: () => goToSection(sectionIds[Math.min(sectionIds.length - 1, activeIndex + 1)]),
  };
}

import { personalInfo } from "../data/personalInfo";
import { sectionIds } from "../data/sections";
import type { Translation } from "../data/translations";

interface FooterProps {
  activeIndex: number;
  text: Translation;
  onPrevious: () => void;
  onNext: () => void;
}

export function Footer({ activeIndex, text, onPrevious, onNext }: FooterProps) {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {personalInfo.name}
      </span>
      <div className="footer-navigation">
        <span className="section-count">
          0{activeIndex + 1} <span className="muted">/ 05</span>
        </span>
        <span className="footer-line" />
        <button
          className="footer-arrow"
          onClick={onPrevious}
          disabled={activeIndex === 0}
          aria-label={text.common.previous}
        >
          ←
        </button>
        <button
          className="footer-next"
          onClick={onNext}
          disabled={activeIndex === sectionIds.length - 1}
          aria-label={text.common.next}
        >
          {activeIndex < sectionIds.length - 1 && (
            <span>{text.navigation[sectionIds[activeIndex + 1]]}</span>
          )}{" "}
          →
        </button>
      </div>
    </footer>
  );
}

import type { Translation } from "../data/translations";
import type { SectionId } from "../types/portfolio";

interface HomeProps {
  text: Translation;
  onNavigate: (section: SectionId) => void;
}

export function Home({ text, onNavigate }: HomeProps) {
  const content = text.home;
  return (
    <div className="home">
      <div className="hero-copy">
        <div className="eyebrow">
          <span />
          {content.eyebrow}
        </div>
        <h1>
          {content.lineOne}
          <br />
          <span className="serif">{content.lineTwo}</span>
          <br />
          {content.lineThree}
          <span className="accent">.</span>
        </h1>
        <p className="hero-description">{content.description}</p>
        <div className="hero-actions">
          <button className="button primary" onClick={() => onNavigate("projects")}>
            {content.projects}
            <span aria-hidden="true">↗</span>
          </button>
          <button className="text-link" onClick={() => onNavigate("contact")}>
            {content.contact}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="hero-note">
          <span className="line" />
          {content.note}
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="art-grid" />
        <span className="art-label">{content.artLabel}</span>
        <div className="sculpture">
          <div className="sculpture-ring ring-one" />
          <div className="sculpture-ring ring-two" />
        </div>
        <span className="art-index">{content.artCaption}</span>
        <span className="art-plus">+</span>
      </div>
      <div className="home-meta">
        <div>
          <span>{content.focusLabel}</span>
          <p>{content.focus}</p>
        </div>
        <div>
          <span>{content.approachLabel}</span>
          <p>{content.approach}</p>
        </div>
        <span className="small-mark">{content.purpose}</span>
      </div>
    </div>
  );
}

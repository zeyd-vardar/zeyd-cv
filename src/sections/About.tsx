import { SectionHeading } from "../components/SectionHeading";
import { personalInfo } from "../data/personalInfo";
import type { Translation } from "../data/translations";

export function About({ text, onContact }: { text: Translation; onContact: () => void }) {
  const content = text.about;
  return (
    <div className="section-content">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} accent={content.accent} />
      <div className="about-grid">
        <div className="biography">
          <p className="lead">{content.intro}</p>
          <p>{content.body}</p>
          <div className="career-goal">
            <h3>{content.goalTitle}</h3>
            <p>{content.goal}</p>
          </div>
          <button className="text-link" onClick={onContact}>
            {content.contact}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="principles">
          {content.principles.map((principle, index) => (
            <article className="principle" key={principle.title}>
              <span className="principle-number">0{index + 1}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </article>
          ))}
          <div className="signature">
            <span>{personalInfo.name}</span>
            <small>{content.signature}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

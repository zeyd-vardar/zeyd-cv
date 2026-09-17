import { SectionHeading } from "../components/SectionHeading";
import { skillGroups } from "../data/skills";
import type { Translation } from "../data/translations";
import type { Language } from "../types/portfolio";

export function Skills({ text, language }: { text: Translation; language: Language }) {
  const content = text.skills;
  return (
    <div className="section-content">
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        accent={content.accent}
        description={content.description}
      />
      <div className="skills-list">
        {skillGroups.map((group, index) => (
          <article className="skill-group" key={group.title.en}>
            <span className="principle-number">0{index + 1}</span>
            <div className="skill-group-heading">
              <h3>{group.title[language]}</h3>
              <p>{group.description[language]}</p>
            </div>
            <ul className="skill-tags">
              {group.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

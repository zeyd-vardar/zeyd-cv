import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { projects } from "../data/projects";
import type { Translation } from "../data/translations";
import type { Language } from "../types/portfolio";

export function Projects({ text, language }: { text: Translation; language: Language }) {
  const content = text.projects;
  return (
    <div className="section-content">
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        accent={content.accent}
        description={content.description}
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            language={language}
            text={text}
          />
        ))}
      </div>
      <p className="section-footnote">{content.note}</p>
    </div>
  );
}

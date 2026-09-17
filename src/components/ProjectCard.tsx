import { useState } from "react";
import type { Translation } from "../data/translations";
import type { Language, Project } from "../types/portfolio";

interface ProjectCardProps {
  project: Project;
  language: Language;
  text: Translation;
  index: number;
}

export function ProjectCard({ project, language, text, index }: ProjectCardProps) {
  const [failedImage, setFailedImage] = useState(false);
  return (
    <article className="project-card">
      <div className={`project-preview preview-${project.visual}`}>
        {project.image && !failedImage ? (
          <img
            src={project.image}
            alt={`${project.title} ${text.projects.previewAlt}`}
            loading="lazy"
            width={560}
            height={400}
            onError={() => setFailedImage(true)}
          />
        ) : (
          <div className="project-mockup" aria-hidden="true">
            <div className="mockup-toolbar">
              <i />
              <i />
              <i />
            </div>
            <div className="mockup-content">
              <span className="mockup-brand">
                {project.title}
                <span>®</span>
              </span>
              <div className="mockup-composition">
                <div />
                <div />
                <div />
              </div>
              <div className="mockup-lines">
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
        <span className="project-index">0{index + 1}</span>
      </div>
      <div className="project-category">{project.category[language]}</div>
      <div className="project-title">
        <h3>{project.title}</h3>
        <span className="project-status">{text.projects.statuses[project.status]}</span>
      </div>
      <p>{project.description[language]}</p>
      <ul className="tags" aria-label={text.navigation.skills}>
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div className="project-links">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {text.projects.live} ↗
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            {text.projects.source} ↗
          </a>
        )}
        {!project.liveUrl && !project.githubUrl && <span>{text.projects.noLink}</span>}
      </div>
    </article>
  );
}

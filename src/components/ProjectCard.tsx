import { ProjectPreview } from "./ProjectPreview";
import type { Translation } from "../data/translations";
import type { Language, Project } from "../types/portfolio";

interface ProjectCardProps {
  project: Project;
  language: Language;
  text: Translation;
  index: number;
}

export function ProjectCard({ project, language, text, index }: ProjectCardProps) {
  const destination = project.liveUrl ?? project.githubUrl;
  const preview = (
    <ProjectPreview
      project={project}
      index={index}
      alt={`${project.title} ${text.projects.previewAlt}`}
    />
  );
  return (
    <article className="project-card">
      {destination ? (
        <a
          className="project-preview-link"
          href={destination}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${project.liveUrl ? text.projects.live : text.projects.source}`}
        >
          {preview}
        </a>
      ) : (
        preview
      )}
      <div className="project-category">{project.category[language]}</div>
      <div className="project-title">
        <h3>
          {destination ? (
            <a href={destination} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
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

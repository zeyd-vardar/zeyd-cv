import { useState } from "react";
import type { Project } from "../types/portfolio";

interface ProjectPreviewProps {
  project: Project;
  index: number;
  alt: string;
}

export function ProjectPreview({ project, index, alt }: ProjectPreviewProps) {
  const [failedImage, setFailedImage] = useState(false);

  return (
    <div className={`project-preview preview-${project.visual}`}>
      {project.image && !failedImage ? (
        <img
          src={project.image}
          alt={alt}
          loading="lazy"
          width={560}
          height={400}
          onError={() => setFailedImage(true)}
        />
      ) : (
        <div className="project-cover" aria-hidden="true">
          <span className="project-cover-title">{project.title}</span>
          <span className="project-cover-arrow">↗</span>
        </div>
      )}
      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

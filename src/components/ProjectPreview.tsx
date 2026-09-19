import { useState } from "react";
import type { Project } from "../types/portfolio";

interface ProjectPreviewProps {
  project: Project;
  index: number;
  alt: string;
}

function ProjectArtwork({ project }: Pick<ProjectPreviewProps, "project">) {
  const artwork = {
    "soccer-chat": (
      <><rect width="560" height="400" fill="#103e36" /><path d="M0 82h560M0 318h560M95 0v400M465 0v400" stroke="#75cda8" strokeOpacity=".28" /><rect x="153" y="36" width="254" height="328" rx="25" fill="#f7f4ea" /><rect x="167" y="60" width="226" height="55" rx="10" fill="#164b40" /><circle cx="195" cy="87" r="14" fill="#f3d56d" /><circle cx="365" cy="87" r="14" fill="#e9846b" /><text x="280" y="96" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="700">2 — 1</text><rect x="180" y="138" width="149" height="34" rx="12" fill="#d5ede1" /><rect x="230" y="186" width="148" height="34" rx="12" fill="#e8e1d7" /><rect x="180" y="234" width="126" height="34" rx="12" fill="#d5ede1" /><rect x="180" y="302" width="200" height="35" rx="17" fill="#e8e1d7" /><circle cx="353" cy="319" r="11" fill="#3c9f78" /></>
    ),
    "kahve-cesitleri": (
      <><rect width="560" height="400" fill="#d9c7ab" /><circle cx="102" cy="103" r="102" fill="#f2eadc" /><circle cx="451" cy="334" r="132" fill="#9b6a47" fillOpacity=".18" /><rect x="111" y="51" width="338" height="298" rx="16" fill="#fffaf1" /><text x="145" y="91" fill="#5d3b29" fontSize="17" fontWeight="700">İÇİMLİK</text><rect x="145" y="112" width="270" height="28" rx="8" fill="#eee4d5" /><circle cx="199" cy="209" r="47" fill="#b66f3c" /><circle cx="199" cy="197" r="31" fill="#f5e8d4" /><path d="M244 202h34a24 24 0 0 1 0 48h-34" fill="none" stroke="#b66f3c" strokeWidth="11" /><rect x="145" y="282" width="124" height="12" rx="6" fill="#76513a" /><rect x="145" y="305" width="184" height="9" rx="4.5" fill="#c8b7a0" /><rect x="338" y="171" width="55" height="83" rx="27" fill="#78906a" /><path d="M365 155v118" stroke="#49633f" strokeWidth="7" /></>
    ),
    "renk-kacisi": (
      <><rect width="560" height="400" fill="#1e1a42" /><path d="M0 323C105 218 152 370 261 232S422 126 560 161" fill="none" stroke="#ffffff" strokeOpacity=".18" strokeWidth="3" strokeDasharray="10 12" /><circle cx="124" cy="274" r="48" fill="#4ee0d0" /><circle cx="124" cy="274" r="27" fill="#b9fff7" /><rect x="241" y="113" width="53" height="53" rx="15" fill="#fb7185" transform="rotate(18 267 139)" /><circle cx="373" cy="240" r="35" fill="#f8cf55" /><path d="M458 83l34 58h-68z" fill="#a78bfa" /><rect x="34" y="32" width="128" height="38" rx="19" fill="#ffffff" fillOpacity=".13" /><text x="53" y="57" fill="#fff" fontSize="15" fontWeight="700">SKOR  248</text></>
    ),
    "acar-muhendislik": (
      <><rect width="560" height="400" fill="#e8ece9" /><path d="M92 0v95c0 30 24 54 54 54h69c28 0 51 23 51 51v200M399 0v94c0 29-24 53-53 53h-82c-29 0-53 24-53 53v200" fill="none" stroke="#d37c3c" strokeWidth="20" /><path d="M92 0v95c0 30 24 54 54 54h69c28 0 51 23 51 51v200M399 0v94c0 29-24 53-53 53h-82c-29 0-53 24-53 53v200" fill="none" stroke="#f0af63" strokeWidth="7" /><circle cx="215" cy="149" r="36" fill="#315a66" /><circle cx="215" cy="149" r="23" fill="#f8f7f2" /><path d="M215 126v23l15 9" stroke="#315a66" strokeWidth="4" fill="none" /><rect x="330" y="234" width="122" height="84" rx="6" fill="#315a66" /><path d="M350 255h82M350 276h54M350 297h67" stroke="#bcd0d1" strokeWidth="7" /></>
    ),
    ecommerce: (
      <><rect width="560" height="400" fill="#f3eee7" /><rect x="65" y="55" width="430" height="289" rx="15" fill="#fff" stroke="#d9cdc0" strokeWidth="5" /><rect x="65" y="55" width="430" height="47" rx="15" fill="#273440" /><circle cx="96" cy="78" r="7" fill="#ee9278" /><circle cx="118" cy="78" r="7" fill="#edcb77" /><rect x="97" y="128" width="111" height="145" rx="8" fill="#d9e4df" /><rect x="225" y="128" width="111" height="145" rx="8" fill="#e8d8cc" /><rect x="353" y="128" width="111" height="145" rx="8" fill="#d8dce9" /><path d="M131 181h43v50h-43zM258 164h45v67h-45zM387 181h43v50h-43z" fill="#fff" fillOpacity=".72" /><rect x="97" y="294" width="215" height="13" rx="6" fill="#34444f" /><rect x="385" y="286" width="79" height="30" rx="15" fill="#d96f4a" /></>
    ),
  }[project.id] ?? null;

  return <svg viewBox="0 0 560 400" role="img" aria-label={`${project.title} preview`}>{artwork}</svg>;
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
        <ProjectArtwork project={project} />
      )}
      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, accent, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span />
        {eyebrow}
      </div>
      <h2>
        {title} <span className="serif">{accent}</span>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

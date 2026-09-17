import { ContactForm } from "../components/ContactForm";
import { SectionHeading } from "../components/SectionHeading";
import { personalInfo, socialLinks } from "../data/personalInfo";
import type { Translation } from "../data/translations";

export function Contact({ text }: { text: Translation }) {
  const content = text.contact;
  return (
    <div className="section-content contact-grid">
      <div className="contact-copy">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          accent={content.accent}
          description={content.description}
        />
        <dl className="contact-details">
          <div>
            <dt>{content.email}</dt>
            <dd>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email} ↗</a>
            </dd>
          </div>
          <div>
            <dt>{content.phone}</dt>
            <dd>
              {personalInfo.phoneHref ? (
                <a href={personalInfo.phoneHref}>{personalInfo.phone}</a>
              ) : (
                personalInfo.phone
              )}
            </dd>
          </div>
          <div>
            <dt>{content.social}</dt>
            <dd className="social-links">
              {socialLinks.map((social) =>
                social.url ? (
                  <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.label} ↗
                  </a>
                ) : (
                  <span key={social.label} title={text.common.soon}>
                    {social.label} <small>({text.common.soon})</small>
                  </span>
                ),
              )}
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm text={text} />
    </div>
  );
}

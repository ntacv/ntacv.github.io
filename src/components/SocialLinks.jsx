import {
  FaBook,
  FaCodepen,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaNewspaper,
  FaYoutube,
} from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { useContactsData } from "../hooks/useContactsData";
import { SOCIAL_LINKS } from "../data/content";

const ICONS = {
  globe: FaGlobe,
  book: FaBook,
  news: FaNewspaper,
  linkedin: FaLinkedin,
  github: FaGithub,
  instagram: FaInstagram,
  youtube: FaYoutube,
  codepen: FaCodepen,
  notion: SiNotion,
  news: SiNotion,
};

/**
 * Render social links from Google Sheets contacts tab, or fallback to static data.
 * Uses a vertical list with the original circular icon look.
 * @returns {React.ReactElement}
 */
export default function SocialLinks() {
  const { contacts, status } = useContactsData();

  const sourceLinks = status === "success" && contacts.length > 0 ? contacts : SOCIAL_LINKS;

  return (
    <div className="social-links-column" aria-label="Contact links">
      {sourceLinks.map((link, index) => {
        const iconName = String(link.icon || "globe").trim().toLowerCase();
        const Icon = ICONS[iconName] ?? FaGlobe;
        const href = link.url || link.href || "#";
        const label = link.title || link.label || "Contact link";
        const description = link.description || link.desc || "";
        const color = link.color || "var(--color-primary)";
        return (
          <a
            key={`${href}-${index}`}
            className="social-link-item"
            target="_blank"
            rel="noreferrer"
            href={href}
            aria-label={label}
            title={description || label}
            style={{ "--link-color": color }}
          >
            <span className="social-link-icon">
              <Icon />
            </span>
            <span className="social-link-text">
              <span className="social-link-title">{label}</span>
              {description ? <span className="social-link-desc">{description}</span> : null}
            </span>
          </a>
        );
      })}
    </div>
  );
}

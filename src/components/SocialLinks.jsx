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
};

/**
 * Render social links from Google Sheets contacts tab, or fallback to static data.
 * When sheet data is present and has descriptions, render as a column layout with icon + title.
 * Otherwise, render as circular icon buttons (fallback style).
 * @returns {React.ReactElement}
 */
export default function SocialLinks() {
  const { contacts, status } = useContactsData();

  // Fallback to static data if API is disabled or loading fails
  const linksToRender = status === "success" && contacts.length > 0 ? contacts : SOCIAL_LINKS;
  const useColumnLayout = status === "success" && contacts.length > 0;

  if (status === "disabled" || status === "error") {
    // Still render fallback links silently
    return (
      <div className="social-links" aria-label="Contact links">
        {SOCIAL_LINKS.map((link) => {
          const Icon = ICONS[link.icon] ?? FaGlobe;
          return (
            <a key={link.href} target="_blank" rel="noreferrer" href={link.href} aria-label={link.label} title={link.label}>
              <Icon />
            </a>
          );
        })}
      </div>
    );
  }

  if (useColumnLayout) {
    // Column layout with icon + title for sheet-driven contacts
    return (
      <div className="social-links-column" aria-label="Contact links">
        {linksToRender.map((link, index) => {
          const Icon = ICONS[link.icon] ?? FaGlobe;
          const key = link.url || link.href || index;
          return (
            <a
              key={key}
              className="social-link-item"
              target="_blank"
              rel="noreferrer"
              href={link.url || link.href}
              aria-label={link.title || link.label}
              title={link.description || link.title || link.label}
              style={{ "--link-color": link.color || "var(--color-primary)" }}
            >
              <span className="social-link-icon">
                <Icon />
              </span>
              <span className="social-link-text">
                <span className="social-link-title">{link.title || link.label}</span>
                {link.description && <span className="social-link-desc">{link.description}</span>}
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  // Circular icon buttons for fallback static data
  return (
    <div className="social-links" aria-label="Contact links">
      {linksToRender.map((link, index) => {
        const Icon = ICONS[link.icon] ?? FaGlobe;
        const key = link.url || link.href || index;
        return (
          <a key={key} target="_blank" rel="noreferrer" href={link.url || link.href} aria-label={link.title || link.label} title={link.title || link.label}>
            <Icon />
          </a>
        );
      })}
    </div>
  );
}

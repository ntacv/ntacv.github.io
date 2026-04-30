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
 * Normalize a sheet icon name to match the local icon map.
 * @param {string | null | undefined} value
 * @returns {string}
 */
function normalizeIconName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^fa[srlb]?-?/, "")
    .replace(/[^a-z0-9]/g, "") || "globe";
}

/**
 * Convert a sheet/static link into the unified display shape.
 * @param {Object} link
 * @param {number} index
 * @returns {{ key: string, title: string, url: string, icon: string, color: string, description: string }}
 */
function normalizeLink(link, index) {
  const title = link.title || link.label || "Untitled";
  const url = link.url || link.href || "#";
  const icon = normalizeIconName(link.icon);
  const color = link.color || "var(--color-primary)";
  const description = link.description || link.desc || "";
  const key = url !== "#" ? url : `${title}-${index}`;

  return { key, title, url, icon, color, description };
}

/**
 * Render social links from Google Sheets contacts tab, or fallback to static data.
 * The section always uses a column-card layout so sheet data updates are visible immediately.
 * @returns {React.ReactElement}
 */
export default function SocialLinks() {
  const { contacts, status } = useContactsData();

  const sourceLinks = status === "success" && contacts.length > 0 ? contacts : SOCIAL_LINKS;

  return (
    <div className="social-links-column" aria-label="Contact links">
      {sourceLinks.map((link, index) => {
        const normalizedLink = normalizeLink(link, index);
        const Icon = ICONS[normalizedLink.icon] ?? FaGlobe;
        return (
          <a
            key={normalizedLink.key}
            className="social-link-item"
            target="_blank"
            rel="noreferrer"
            href={normalizedLink.url}
            aria-label={normalizedLink.title}
            title={normalizedLink.description || normalizedLink.title}
            style={{ "--link-color": normalizedLink.color }}
          >
            <span className="social-link-icon">
              <Icon />
            </span>
            <span className="social-link-text">
              <span className="social-link-title">{normalizedLink.title}</span>
              {normalizedLink.description ? <span className="social-link-desc">{normalizedLink.description}</span> : null}
            </span>
          </a>
        );
      })}
    </div>
  );
}

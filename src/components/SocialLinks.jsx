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

export default function SocialLinks() {
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

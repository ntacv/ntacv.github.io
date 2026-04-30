import { useEffect, useMemo, useState } from "react";
import CardContainer from "../components/CardContainer";
import CardItem from "../components/CardItem";
import CodeText from "../components/CodeText";
import LanguageDataList from "../components/LanguageDataList";
import LiveCard from "../components/LiveCard";
import Mosaic from "../components/Mosaic";
import SocialLinks from "../components/SocialLinks";
import { HOBBY_CARDS, PROJECT_CARDS } from "../data/content";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { useWordings, getWording } from "../hooks/useWordings";

const DOC_ID = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const TOGGLES_SHEET_ID = "toggles";

/**
 * @param {string} value
 * @returns {string}
 */
function normalizeToggleName(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, "");
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function parseToggleValue(value) {
  return ["true", "1", "yes", "on"].includes(String(value).trim().toLowerCase());
}

/**
 * @param {string[][] | undefined} values
 * @returns {Record<string, boolean>}
 */
function mapToggles(values) {
  if (!Array.isArray(values)) {
    return {};
  }

  /** @type {Record<string, boolean>} */
  const toggles = {};
  values.forEach((row) => {
    const name = normalizeToggleName(String(row[0] || ""));
    if (!name) {
      return;
    }

    const enabled = parseToggleValue(String(row[1] || ""));
    toggles[name] = Boolean(toggles[name]) || enabled;
  });

  return toggles;
}

/**
 * @param {Record<string, boolean>} toggles
 * @param {string[]} aliases
 * @returns {boolean}
 */
function isToggleEnabled(toggles, aliases) {
  const matched = aliases
    .map((alias) => normalizeToggleName(alias))
    .filter((alias) => Object.prototype.hasOwnProperty.call(toggles, alias))
    .map((alias) => toggles[alias]);

  if (!matched.length) {
    return true;
  }

  return matched.some(Boolean);
}

/**
 * Render the animated landing page.
 * @returns {React.ReactElement}
 */
function ZoomAnimation() {
  return (
    <>
      <div className="zoom-animation">
        <img className="atom-background formula-ring" src="/assets/Asset 2.png" alt="Foreground animation about quantum" />
        <img className="atom-background formula-1" src="/assets/formula/formula_quantum (1).svg" alt="Quantum formula 1" />
        <img className="atom-background formula-2" src="/assets/formula/formula_quantum (2).svg" alt="Quantum formula 2" />
        <img className="atom-background formula-3" src="/assets/formula/formula_quantum (3).svg" alt="Quantum formula 3" />
        <img className="atom-background formula-4" src="/assets/formula/formula_quantum (4).svg" alt="Quantum formula 4" />
        <img className="atom-background formula-5" src="/assets/formula/formula_quantum (5).svg" alt="Quantum formula 5" />
      </div>

      <div className="zoom-animation mobile-only">
        <div className="anim-bloc right" />
        <div className="anim-bloc left" />
      </div>
    </>
  );
}

/**
 * Home page for the portfolio.
 * @returns {React.ReactElement}
 */
export default function HomePage() {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [startFromZero, setStartFromZero] = useState(false);
  const [sectionToggles, setSectionToggles] = useState(/** @type {Record<string, boolean>} */ ({}));

  const { wordings } = useWordings("en");

  const key = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const togglesApiUrl = useMemo(() => {
    if (!key) {
      return "";
    }

    return `https://sheets.googleapis.com/v4/spreadsheets/${DOC_ID}/values/${TOGGLES_SHEET_ID}!A1:B100?key=${key}`;
  }, [key]);

  useEffect(() => {
    if (!togglesApiUrl) {
      setSectionToggles({});
      return;
    }

    const controller = new AbortController();

    async function loadToggles() {
      try {
        const response = await fetch(togglesApiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Google Sheets toggle response: ${response.status}`);
        }

        const payload = await response.json();
        setSectionToggles(mapToggles(payload.values));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setSectionToggles({});
      }
    }

    loadToggles();

    return () => controller.abort();
  }, [togglesApiUrl]);

  const showAnimation = isToggleEnabled(sectionToggles, ["animation", "animations"]);
  const showIntro = isToggleEnabled(sectionToggles, ["intro", "introduction"]);
  const showLinks = isToggleEnabled(sectionToggles, ["links", "social", "sociallinks", "contact", "contacts"]);
  const showLanguages = isToggleEnabled(sectionToggles, ["languages", "language"]);
  const showProjects = isToggleEnabled(sectionToggles, ["projects", "project"]);
  const showHobbies = isToggleEnabled(sectionToggles, ["hobbies", "hobby"]);
  const showPhotos = isToggleEnabled(sectionToggles, ["photos", "photo", "photography"]);
  const showLive = isToggleEnabled(sectionToggles, ["live", "liveproject", "liveprojects"]);

  useScrollAnimation(showAnimation && animationEnabled, startFromZero);

  return (
    <>
      {showAnimation ? <ZoomAnimation /> : null}

      <header>
        <div className="content-full">
          <div className="fixed-down center">
            <h1>Nathan Choukroun</h1>
            <p>
              <a href="https://github.com/ntacv" target="_blank" rel="noreferrer">
                My GitHub: ntacv
              </a>
            </p>

            {showAnimation ? (
              <div className="toggle-row">
                Enable animation
                <label className="switch">
                  <input type="checkbox" checked={animationEnabled} onChange={(event) => setAnimationEnabled(event.target.checked)} />
                  <span className="slider round" />
                </label>
              </div>
            ) : null}

            <noscript>Please activate Javascript in your browser settings for a better experience.</noscript>
          </div>
        </div>

        <div className="content-full" />
      </header>

      <main>
        <section>
          <div className="hidden-dev">
            <p>Play with the animation:</p>
            <label htmlFor="start_from_0">
              <input
                type="checkbox"
                id="start_from_0"
                checked={startFromZero}
                onChange={(event) => setStartFromZero(event.target.checked)}
              />
              Start from infinity
            </label>
          </div>

          {showIntro ? (
            <p>
              {getWording(wordings, "intro-text", "Lorem ipsum dolor... I am Nathan, an engineer from ESILV. This is not a professional presentation so you can find my contacts down there. Thank you for reading and I like critics if you have some.")}
            </p>
          ) : null}

          {showLinks ? (
            <>
              <br />
              <br />
              <CodeText>{getWording(wordings, "contacts-label", "To contact me:")}</CodeText>
              <br />
              <br />
              <SocialLinks />
            </>
          ) : null}

          {showLanguages ? (
            <>
              <br />
              <br />
              <CodeText>{getWording(wordings, "languages-label", "Languages I learned:")}</CodeText>
              <br />
              <br />
              <LanguageDataList />
            </>
          ) : null}

          {showProjects ? (
            <>
              <br />
              <CodeText>{getWording(wordings, "projects-label", "The projects I have done:")}</CodeText>
              <br />
              <br />
              <CardContainer className="project-cards-grid">
                {PROJECT_CARDS.map((card) => (
                  <CardItem key={`${card.text}-${card.src}`} href={card.href} src={card.src}>
                    {card.text}
                  </CardItem>
                ))}
              </CardContainer>
            </>
          ) : null}

          {showHobbies ? (
            <>
              <br />
              <br />
              <CodeText>{getWording(wordings, "hobbies-label", "What I like to do:")}</CodeText>
              <br />
              <br />
              <CardContainer>
                {HOBBY_CARDS.map((card) => (
                  <CardItem key={`${card.text}-${card.src}`} href={card.href} src={card.src}>
                    {card.text}
                  </CardItem>
                ))}
              </CardContainer>
            </>
          ) : null}

          {showPhotos ? (
            <>
              <br />
              <br />
              <CodeText>{getWording(wordings, "photography-label", "Photography:")}</CodeText>
              <br />
              <br />
              <Mosaic />
            </>
          ) : null}

          {showLive ? <LiveCard /> : null}
        </section>
      </main>
    </>
  );
}

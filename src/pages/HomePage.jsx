import { useState } from "react";
import CardContainer from "../components/CardContainer";
import CardItem from "../components/CardItem";
import CodeText from "../components/CodeText";
import LangPercent from "../components/LangPercent";
import Mosaic from "../components/Mosaic";
import ProjectDataList from "../components/ProjectDataList";
import SocialLinks from "../components/SocialLinks";
import { HOBBY_CARDS, LANGUAGES, PROJECT_CARDS } from "../data/content";
import useScrollAnimation from "../hooks/useScrollAnimation";

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

  useScrollAnimation(animationEnabled, startFromZero);

  return (
    <>
      <ZoomAnimation />

      <header>
        <div className="content-full">
          <div className="fixed-down center">
            <h1>Nathan Choukroun</h1>
            <p>
              <a href="https://github.com/ntacv" target="_blank" rel="noreferrer">
                My GitHub: ntacv
              </a>
            </p>
            <p>
              <a href="/pages/cv/" target="_blank" rel="noreferrer">
                My resume
              </a>
            </p>

            <div className="toggle-row">
              Enable animation
              <label className="switch">
                <input type="checkbox" checked={animationEnabled} onChange={(event) => setAnimationEnabled(event.target.checked)} />
                <span className="slider round" />
              </label>
            </div>

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

          <p>
            Lorem ipsum dolor... I am Nathan, an engineer from <a href="https://www.esilv.fr/en/" target="_blank" rel="noreferrer">ESILV</a>. This is not a
            professional presentation so you can find my contacts down there. Thank you for reading and I like critics if you have some.
          </p>

          <br />
          <br />
          <CodeText>To contact me:</CodeText>
          <br />
          <br />
          <SocialLinks />

          <br />
          <br />
          <CodeText>Languages I learned:</CodeText>
          <br />
          <br />

          {LANGUAGES.map((language) => (
            <LangPercent key={language.text} color={language.color} percent={language.percent}>
              {language.text}
            </LangPercent>
          ))}

          <br />
          <CodeText>The projects I have done:</CodeText>
          <br />
          <br />

          <CardContainer>
            {PROJECT_CARDS.map((card) => (
              <CardItem key={`${card.text}-${card.src}`} href={card.href} src={card.src}>
                {card.text}
              </CardItem>
            ))}
          </CardContainer>

          <br />
          <br />
          <CodeText>What I like to do:</CodeText>
          <br />
          <br />

          <CardContainer>
            {HOBBY_CARDS.map((card) => (
              <CardItem key={`${card.text}-${card.src}`} href={card.href} src={card.src}>
                {card.text}
              </CardItem>
            ))}
          </CardContainer>

          <br />
          <br />
          <CodeText>Photography:</CodeText>
          <br />
          <br />
          <Mosaic />

          <br />
          <br />
          <CodeText>Live project data:</CodeText>
          <br />
          <br />
          <ProjectDataList />
        </section>
      </main>
    </>
  );
}
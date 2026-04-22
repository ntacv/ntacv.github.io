import { useEffect } from "react";

/**
 * @param {number} toTop
 * @param {number} toScale
 * @param {number} toX
 * @param {number} toY
 * @param {boolean} startFromZero
 */
function animateRatio(toTop, toScale = 1, toX = 0, toY = 0, startFromZero = false) {
  let scale = startFromZero ? 0 : 1;
  scale += 0.002 * toScale * toTop;

  const left = toX * 0.2 * toTop;
  const top = toY * 0.2 * toTop;

  return `scale(${scale}) translateX(${left}px) translateY(${top}px)`;
}

/**
 * @param {boolean} animationEnabled
 * @param {boolean} startFromZero
 */
export default function useScrollAnimation(animationEnabled, startFromZero) {
  useEffect(() => {
    const animatedObject = /** @type {HTMLElement | null} */ (document.querySelector(".zoom-animation"));
    if (!animatedObject) {
      return undefined;
    }

    animatedObject.style.display = animationEnabled ? "block" : "none";

    if (!animationEnabled) {
      return undefined;
    }

    function handleScroll() {
      const toTop = window.scrollY;

      const ring = /** @type {HTMLElement | null} */ (document.querySelector(".formula-ring"));
      const formula1 = /** @type {HTMLElement | null} */ (document.querySelector(".formula-1"));
      const formula2 = /** @type {HTMLElement | null} */ (document.querySelector(".formula-2"));
      const formula3 = /** @type {HTMLElement | null} */ (document.querySelector(".formula-3"));
      const formula4 = /** @type {HTMLElement | null} */ (document.querySelector(".formula-4"));
      const formula5 = /** @type {HTMLElement | null} */ (document.querySelector(".formula-5"));
      /** @type {HTMLElement[]} */
      const formulas = [ring, formula1, formula2, formula3, formula4, formula5].filter((node) => node !== null);

      const shouldHide = toTop > 1000;
      formulas.forEach((node) => {
        node.style.display = shouldHide ? "none" : "block";
      });

      if (ring) ring.style.transform = animateRatio(toTop, 1, 0, 0, startFromZero);
      if (formula1) formula1.style.transform = animateRatio(toTop, 1, -5, -1, startFromZero);
      if (formula2) formula2.style.transform = animateRatio(toTop, 1, 4, -1, startFromZero);
      if (formula3) formula3.style.transform = animateRatio(toTop, 1, 5, 1, startFromZero);
      if (formula4) formula4.style.transform = animateRatio(toTop, 1, -2, 1, startFromZero);
      if (formula5) formula5.style.transform = animateRatio(toTop, 1, -4, 0, startFromZero);

      const movingBlock = /** @type {HTMLElement | null} */ (document.querySelector(".anim-bloc.right"));
      const rightBlock = /** @type {HTMLElement | null} */ (document.querySelector(".anim-bloc.left"));
      const left = 0.9 * toTop;
      if (movingBlock) {
        movingBlock.style.left = `${left}px`;
      }
      if (rightBlock) {
        rightBlock.style.right = `${left}px`;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationEnabled, startFromZero]);
}

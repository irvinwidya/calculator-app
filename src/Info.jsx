import { useRef } from "react";
import "./Info.scss";

export default function Info() {
  const infoButtonRef = useRef();
  const infoContentRef = useRef();

  let infoButtonEl, infoContentEl;

  function toggleInfo() {
    infoButtonEl = infoButtonRef.current;
    infoButtonEl.classList.toggle("active");

    infoContentEl = infoContentRef.current;
    infoContentEl.classList.toggle("v-hidden");
    // infoContentEl.classList.toggle("active");

    // Time based on transition duration in css
    infoButtonEl.setAttribute("disabled", true);
    setTimeout(() => {
      infoButtonEl.removeAttribute("disabled");
    }, 1000);

    if (!infoContentEl.classList.contains("active")) {
      infoContentEl.classList.toggle("active");
      setTimeout(() => {
        infoContentEl.classList.toggle("expand-width");
      }, 250);
      setTimeout(() => {
        infoContentEl.classList.toggle("expand-height");
      }, 500);
      setTimeout(() => {
        infoContentEl.classList.toggle("text-transparent");
      }, 750);
    } else {
      setTimeout(() => {
        infoContentEl.classList.toggle("expand-width");
      }, 250);
      setTimeout(() => {
        infoContentEl.classList.toggle("expand-height");
        infoContentEl.classList.toggle("text-transparent");
        infoContentEl.classList.toggle("active");
      }, 500);
    }
  }

  return (
    <div id="Info">
      <button
        ref={infoButtonRef}
        id="Info__Button"
        className=""
        onClick={() => toggleInfo()}
      >
        ?
      </button>
      <div
        ref={infoContentRef}
        id="Info__Content"
        className="v-hidden text-transparent"
      >
        <span className="title">My Calculator</span>
        <p className="description">
          <span>A simple calculator app built with MathJS library.</span>
          <span>For more information:</span>
          <a
            href="https://github.com/irvinwidya/my-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub - My Calculator
          </a>
        </p>
      </div>
    </div>
  );
}

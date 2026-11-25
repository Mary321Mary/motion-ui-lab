import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../path";

const experiments = [
  {
    number: "01",
    category: "SCROLL & SPACE",
    title: "Scroll with a story",
    description: "Turn a simple scroll into a smooth, cinematic journey.",
    path: PATH.SCROLL,
    art: "scroll",
    label: "Explore scroll effects",
  },
  {
    number: "02",
    category: "TYPE & VECTOR",
    title: "Words in motion",
    description: "Play with kinetic type, expressive paths, and living shapes.",
    path: PATH.SVG_ANIMATION,
    art: "type",
    label: "Explore text and SVG",
  },
  {
    number: "03",
    category: "TINY DETAILS",
    title: "A little interaction",
    description: "Give every tap a satisfying response and a bit of character.",
    path: PATH.BASKET,
    art: "basket",
    label: "Explore micro-interactions",
  },
  {
    number: "04",
    category: "PLAY & REARRANGE",
    title: "Make room to play",
    description: "Drag, shuffle, and discover how layouts can feel alive.",
    path: PATH.MENU,
    art: "shuffle",
    label: "Explore layout experiments",
  },
];

const ExperimentsSection = () => {
  return (
    <section className="experiments-section" id="experiments">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span /> THE COLLECTION
          </div>
          <h2>
            Curiosity, <em>in motion.</em>
          </h2>
        </div>
        <p>Four little corners of the interface, each with a different rhythm.</p>
      </div>

      <div className="experiment-grid">
        {experiments.map((experiment) => (
          <Link
            className={`experiment-card experiment-${experiment.art}`}
            to={experiment.path}
            key={experiment.number}
            aria-label={experiment.label}
          >
            <div className="experiment-art" aria-hidden="true">
              {experiment.art === "scroll" && (
                <div className="scroll-art">
                  <i />
                  <i />
                  <i />
                  <span>↓</span>
                </div>
              )}
              {experiment.art === "type" && (
                <div className="type-art">
                  <span>Aa</span>
                  <i>✳</i>
                  <b>↗</b>
                </div>
              )}
              {experiment.art === "basket" && (
                <div className="basket-art">
                  <i>+</i>
                  <span>⌑</span>
                  <b>♥</b>
                </div>
              )}
              {experiment.art === "shuffle" && (
                <div className="shuffle-art">
                  <i />
                  <i />
                  <i />
                  <span>↗</span>
                </div>
              )}
              <span className="art-corner">↗</span>
            </div>
            <div className="experiment-info">
              <div className="experiment-meta">
                <span>{experiment.category}</span>
                <span>{experiment.number}</span>
              </div>
              <h3>{experiment.title}</h3>
              <p>{experiment.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExperimentsSection;

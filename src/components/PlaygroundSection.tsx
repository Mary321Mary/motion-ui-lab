import React, { useState } from "react";

import Rotate from "../components/figures/Rotate";
import EnterAnimation from "../components/figures/EnterAnimation";
import Gestures from "../components/figures/Gestures";
import Keyframes from "../components/figures/Keyframes";
import LayoutAnchor from "../components/figures/LayoutAnchor";
import DragConstraints from "../components/figures/DragConstraints";

const PlaygroundSection = () => {
  const [anchorX, setAnchorX] = useState(0.5);
  const [anchorY, setAnchorY] = useState(0.5);

  return (
    <section className="playground-section" id="motion-playground">
      <div className="playground-inner">
        <div className="section-heading playground-heading">
          <div>
            <div className="eyebrow">
              <span /> HANDS-ON PLAYGROUND
            </div>
            <h2>
              Try a few <em>moves.</em>
            </h2>
          </div>
          <p>
            Hover, tap, drag, and tweak the anchor. The best way to get a feel for motion is to
            play.
          </p>
        </div>

        <div className="demo-grid">
          <DemoCard number="01" title="A full turn" hint="A little rotation goes a long way.">
            <Rotate />
          </DemoCard>
          <DemoCard
            number="02"
            title="A soft landing"
            hint="A spring gives this entrance its bounce."
          >
            <EnterAnimation />
          </DemoCard>
          <DemoCard number="03" title="Feel the gesture" hint="Tap the shape to change its scale.">
            <Gestures />
          </DemoCard>
          <DemoCard
            number="04"
            title="Around again"
            hint="A repeating sequence of shape and scale."
          >
            <Keyframes />
          </DemoCard>
          <div className="demo-card anchor-card">
            <div className="demo-card-heading">
              <span className="demo-number">05 / ORIGIN</span>
              <h3>Choose the anchor</h3>
              <p>
                Move the origin and expand the shape to see how it changes. (Do not forget to click
                the tile)
              </p>
            </div>
            <div className="anchor-controls">
              <label htmlFor="anchor-x">
                Origin X <output>{anchorX.toFixed(2)}</output>
              </label>
              <input
                id="anchor-x"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={anchorX}
                onChange={(event) => setAnchorX(parseFloat(event.target.value))}
              />
              <label htmlFor="anchor-y">
                Origin Y <output>{anchorY.toFixed(2)}</output>
              </label>
              <input
                id="anchor-y"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={anchorY}
                onChange={(event) => setAnchorY(parseFloat(event.target.value))}
              />
            </div>
            <div className="anchor-stage">
              <LayoutAnchor anchorX={anchorX} anchorY={anchorY} />
            </div>
          </div>
          <DemoCard
            number="06"
            title="Keep it in bounds"
            hint="Drag the purple tile around its frame."
          >
            <DragConstraints />
          </DemoCard>
        </div>
      </div>
    </section>
  );
};

interface DemoCardProps {
  number: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}

function DemoCard({ number, title, hint, children }: DemoCardProps) {
  return (
    <div className="demo-card">
      <div className="demo-card-heading">
        <span className="demo-number">{number} / PLAY</span>
        <h3>{title}</h3>
        <p>{hint}</p>
      </div>
      <div className="demo-stage">{children}</div>
    </div>
  );
}

export default PlaygroundSection;

import React from "react";
import UseTransform from "../components/animation/UseTransform";
import Counter from "../components/animation/Counter";
import { TypewriterText } from "../components/animation/TypewriterText";
import { ScrambleText } from "../components/animation/ScrambleText";
import { FlipWords } from "../components/animation/FlipWords";
import PathDrawing from "../components/animation/PathDrawing";

const SvgAnimationPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 100,
        padding: "20px",
      }}
    >
      <UseTransform />
      <Counter />
      <TypewriterText />
      <ScrambleText />
      <h1 style={{ fontSize: 36, margin: "auto" }}>
        I am a <FlipWords />
      </h1>
      <PathDrawing />
    </div>
  );
};

export default SvgAnimationPage;

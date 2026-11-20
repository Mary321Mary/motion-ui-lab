import React, { useState } from "react";
import Rotate from "../components/figures/Rotate";
import EnterAnimation from "../components/figures/EnterAnimation";
import Gestures from "../components/figures/Gestures";
import Keyframes from "../components/figures/Keyframes";
import LayoutAnchor from "../components/figures/LayoutAnchor";

const HomePage = () => {
  const [anchorX, setAnchorX] = useState(0.5);
  const [anchorY, setAnchorY] = useState(0.5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 100, paddingBottom: "100px" }}>
      <Rotate />
      <EnterAnimation />
      <Gestures />
      <Keyframes />
      <div style={{ margin: "auto" }}>
        <label htmlFor="x" style={{ display: "block" }}>
          Anchor X: {anchorX}
        </label>
        <input
          id="x"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={anchorX}
          onChange={(e) => setAnchorX(parseFloat(e.target.value))}
        />
        <label htmlFor="y" style={{ display: "block" }}>
          Anchor Y: {anchorY}
        </label>
        <input
          id="y"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={anchorY}
          onChange={(e) => setAnchorY(parseFloat(e.target.value))}
        />
      </div>
      <LayoutAnchor anchorX={anchorX} anchorY={anchorY} />
    </div>
  );
};

export default HomePage;

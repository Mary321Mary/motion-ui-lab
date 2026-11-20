import React from "react";
import ScrollTriggered from "../components/scroll/ScrollTriggered";
import TrackElementWithinViewport from "../components/scroll/TrackElementWithinViewport";
import ScrollHorizontal from "../components/scroll/ScrollHorizontal";
import ScrollLinked from "../components/scroll/ScrollLinked";

const ScrollPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 100, paddingBottom: "20px" }}>
      <ScrollTriggered />
      <TrackElementWithinViewport />
      <ScrollHorizontal />
      <ScrollLinked />
    </div>
  );
};

export default ScrollPage;

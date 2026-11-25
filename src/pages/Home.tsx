import React from "react";
import HeroSection from "../components/HeroSection";
import PlaygroundSection from "../components/PlaygroundSection";
import ExperimentsSection from "../components/ExperimentsSection";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />

      <PlaygroundSection />

      <ExperimentsSection />
    </div>
  );
};

export default HomePage;

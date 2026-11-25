import React from "react";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> AN INTERACTIVE MOTION PLAYGROUND
          </div>
          <h1>
            Make every
            <br />
            interaction <span>feel alive.</span>
          </h1>
        </div>

        <div className="hero-art" aria-label="Animated motion playground preview">
          <div className="art-glow" />
          <div className="art-grid" />
          <div className="art-note art-note-top">
            <span>SPRING / 01</span>
            <i>✳</i>
          </div>
          <div className="art-note art-note-bottom">
            <span>just enjoy</span>
            <i>↗</i>
          </div>

          <motion.div
            className="motion-card"
            initial={{ rotate: -7, y: 14 }}
            animate={{ rotate: [-7, -3, -7], y: [14, 0, 14] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="motion-card-top">
              <span className="motion-card-dot" />
              <span>motion study</span>
              <span className="motion-card-index">001</span>
            </div>

            <div className="motion-card-stage">
              <motion.div
                className="motion-shape motion-shape-large"
                animate={{ rotate: [0, 90, 180, 270, 360], borderRadius: ["28%", "50%", "28%"] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="motion-shape motion-shape-small"
                animate={{ x: [0, 20, -8, 0], y: [0, -14, 12, 0], scale: [1, 1.12, 0.9, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="stage-cross stage-cross-one">+</span>
              <span className="stage-cross stage-cross-two">+</span>
            </div>

            <div className="motion-card-bottom">
              <div>
                <strong>Ease into it.</strong>
                <span>Make it feel natural.</span>
              </div>
              <span className="play-indicator">
                <i />
              </span>
            </div>
          </motion.div>

          <div className="art-side-label">SMALL DETAILS. BIG FEELING.</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

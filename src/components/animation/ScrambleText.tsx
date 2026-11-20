import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export function ScrambleText({ targetText = "SYSTEM ONLINE" }) {
  const progress = useMotionValue(0);

  const scrambled = useTransform(() => {
    const revealedCount = Math.floor(progress.get());
    return targetText
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        if (index < revealedCount) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");
  });

  useEffect(() => {
    const controls = animate(progress, targetText.length, {
      duration: 1.8,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [targetText]);

  return (
    <motion.span style={{ fontSize: 32, fontFamily: "monospace", margin: "auto", color: "#fff" }}>
      {scrambled}
    </motion.span>
  );
}

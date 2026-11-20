import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FlipWordsProps {
  words?: string[];
  interval?: number;
}

export function FlipWords({
  words = ["Full-Stack Developer", "React & Next.js Engineer", "Motion UI Enthusiast"],
  interval = 2500,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  const longestWord = words.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    "",
  );

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        overflow: "hidden",
        verticalAlign: "bottom",
        height: "1.25em",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          visibility: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {longestWord}
      </span>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
          style={{
            position: "absolute",
            left: 0,
            whiteSpace: "nowrap",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

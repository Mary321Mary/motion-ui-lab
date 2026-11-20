import React, { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type AnimationPlaybackControls,
} from "motion/react";

export function TypewriterText({ text = "Hello, Full-Stack Developer!" }) {
  const count = useMotionValue(0);
  const displayText = useTransform(() => text.slice(0, Math.round(count.get())));
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const startTyping = useCallback(() => {
    controlsRef.current?.stop();
    count.set(0);
    controlsRef.current = animate(count, text.length, {
      duration: 2,
      ease: "linear",
    });
  }, [count, text]);

  useEffect(() => {
    startTyping();
    return () => controlsRef.current?.stop();
  }, [text, startTyping]);

  return (
    <motion.div
      onMouseEnter={startTyping}
      style={{
        position: "relative",
        display: "inline-block",
        fontSize: 32,
        fontFamily: "monospace",
        color: "#fff",
        margin: "auto",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          visibility: "hidden",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {text}
        <span
          style={{
            display: "inline-block",
            width: "0.55em",
            height: "1.1em",
            marginLeft: 4,
          }}
        />
      </span>

      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "pre",
        }}
      >
        <motion.span>{displayText}</motion.span>

        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 0.95],
            ease: "linear",
          }}
          style={{
            display: "inline-block",
            width: "0.55em",
            height: "1.1em",
            backgroundColor: "currentColor",
            marginLeft: 4,
          }}
        />
      </span>
    </motion.div>
  );
}

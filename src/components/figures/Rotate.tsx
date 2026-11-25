"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "motion/react";

export default function Rotate() {
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);
  const controlsRef = useRef<ReturnType<typeof animate>[]>([]);

  const replay = useCallback(() => {
    controlsRef.current.forEach((controls) => controls.stop());

    rotate.set(0);
    scale.set(1);

    controlsRef.current = [
      animate(rotate, 360, { duration: 2 }),
      animate(scale, 2, { duration: 2 }),
    ];
  }, [rotate, scale]);

  useEffect(() => {
    replay();
    return () => {
      controlsRef.current.forEach((controls) => controls.stop());
    };
  }, [replay]);

  return <motion.div style={{ ...box, rotate, scale, cursor: "pointer" }} onMouseEnter={replay} />;
}

/**
 * ==============   Styles   ================
 */

const box = {
  width: 100,
  height: 100,
  backgroundColor: "#98c379",
  borderRadius: 5,
  margin: "auto",
};

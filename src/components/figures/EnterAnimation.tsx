"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "motion/react";

export default function EnterAnimation() {
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate>[]>([]);

  const replay = useCallback(() => {
    controlsRef.current.forEach((controls) => controls.stop());

    opacity.set(0);
    scale.set(0);

    controlsRef.current = [
      animate(opacity, 1, { duration: 0.4 }),
      animate(scale, 1, {
        type: "spring",
        visualDuration: 0.4,
        bounce: 0.5,
      }),
    ];
  }, [opacity, scale]);

  useEffect(() => {
    replay();
    return () => {
      controlsRef.current.forEach((controls) => controls.stop());
    };
  }, [replay]);

  return <motion.div style={{ ...ball, opacity, scale, cursor: "pointer" }} onClick={replay} />;
}

/**
 * ==============   Styles   ================
 */

const ball = {
  width: 100,
  height: 100,
  backgroundColor: "#5686F5",
  borderRadius: "50%",
  margin: "auto",
};

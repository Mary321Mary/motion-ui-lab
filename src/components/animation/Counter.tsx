"use client";

import React, { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

export default function Counter() {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, 100, { duration: 7 });
    return () => controls.stop();
  }, []);

  return (
    <motion.div
      style={{
        fontSize: 64,
        lineHeight: 1,
        color: "#fff",
        margin: "auto",
      }}
    >
      {rounded}
    </motion.div>
  );
}

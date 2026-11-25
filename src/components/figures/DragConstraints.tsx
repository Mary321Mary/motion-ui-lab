"use client";

import * as motion from "motion/react-client";
import { useRef } from "react";

export default function DragConstraints() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div ref={constraintsRef} style={constraints}>
      <motion.div drag dragConstraints={constraintsRef} dragElastic={0.2} style={box} />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */

const constraints = {
  width: 200,
  height: 200,
  backgroundColor: "#d309e15b",
  borderRadius: 6,
  margin: "auto",
};

const box = {
  width: 60,
  height: 60,
  backgroundColor: "#D309E1",
  borderRadius: 6,
};

import React from "react";
import * as motion from "motion/react-client";

export default function Rotate() {
  return (
    <motion.div
      style={box}
      animate={{ rotate: 360, scale: 2, transition: { duration: 2 } }}
      transition={{ duration: 5 }}
    />
  );
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

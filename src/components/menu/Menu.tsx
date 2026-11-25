"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, type Variants } from "motion/react";
import * as motion from "motion/react-client";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import LongPress from "../LongPress";
import Stepper from "../Stepper";
import PinchZoom from "../PinchZoom";

export const MENU_ITEMS = [
  {
    id: 0,
    title: "LongPress",
    description: "General system status and summary.",
    render: () => <LongPress />,
  },
  {
    id: 1,
    title: "Stepper",
    description: "Live throughput and latency charts.",
    render: () => <Stepper />,
  },
  {
    id: 2,
    title: "PinchZoom",
    description: "Unhandled exceptions and stack traces.",
    render: () => <PinchZoom />,
  },
  { id: 3, title: "???", description: "", render: () => null },
  { id: 4, title: "???", description: "", render: () => null },
  { id: 5, title: "???", description: "", render: () => null },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen]);

  const activeItem = MENU_ITEMS[activeIndex];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsOpen(false);
  };

  return (
    <div style={{ margin: "auto" }}>
      <div style={container}>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <motion.div style={background} variants={sidebarVariants} />
          <Navigation activeIndex={activeIndex} onSelect={handleSelect} />
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </motion.nav>
        <div style={{ margin: "auto", zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <h2 style={{ textAlign: "center" }}>{activeItem.title}</h2>
              <p>{activeItem.render()}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
  flex: 1,
  margin: "auto",

  width: 700,
  maxWidth: "100%",
  height: 700,
  backgroundColor: "#69c3ff",
  borderRadius: 20,
  border: "1px solid rgb(47, 0, 255)",
  overflow: "hidden",
};

const background: React.CSSProperties = {
  backgroundColor: "#fff",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  width: 300,
  zIndex: 2,
};

/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};

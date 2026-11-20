"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Variants } from "motion/react";
import { stagger, useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div style={{ margin: "auto" }}>
      <div style={container}>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          style={nav}
        >
          <motion.div style={background} variants={sidebarVariants} />
          <Navigation />
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </motion.nav>
      </div>
    </div>
  );
}

const navVariants = {
  open: {
    pointerEvents: "auto" as const,
    transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
  },
  closed: {
    pointerEvents: "none" as const,
    transition: { delayChildren: stagger(0.05, { from: "last" }) },
    transitionEnd: {
      overflowY: "hidden" as const,
    },
  },
};

const Navigation = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const { scrollYProgress } = useScroll({
    container: listRef,
  });

  const maskImage = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [
      "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
      "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
    ],
  );

  const handleAnimationComplete = (definition: string) => {
    if (definition === "closed" && listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <style>{hideScrollbarStyles}</style>
      <motion.ul
        ref={listRef}
        className="no-scrollbar"
        style={{ ...list, maskImage, WebkitMaskImage: maskImage }}
        variants={navVariants}
        onAnimationComplete={handleAnimationComplete}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <MenuItem i={i} />
        ))}
      </motion.ul>
    </>
  );
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
        velocity: -100,
      },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF", "#44ff00"];

const MenuItem = ({ i }: { i: number }) => {
  const border = `2px solid ${colors[i]}`;
  return (
    <motion.li
      style={listItem}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={{ ...iconPlaceholder, border }} />
      <div style={{ ...textPlaceholder, border }} />
    </motion.li>
  );
};

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

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button style={toggleContainer} onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
  flex: 1,
  width: 500,
  maxWidth: "100%",
  height: 400,
  backgroundColor: "#69c3ff",
  borderRadius: 20,
  overflow: "hidden",
};

const nav: React.CSSProperties = {
  width: 300,
};

const background: React.CSSProperties = {
  backgroundColor: "#fff",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  width: 300,
};

const toggleContainer: React.CSSProperties = {
  outline: "none",
  border: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  cursor: "pointer",
  position: "absolute",
  top: 18,
  left: 15,
  width: 50,
  height: 50,
  borderRadius: "50%",
  background: "transparent",
};

const hideScrollbarStyles = `
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE и старый Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;             /* Chrome, Safari и Opera */
  }
`;

const list: React.CSSProperties = {
  listStyle: "none",
  padding: 25,
  margin: 0,
  position: "absolute",
  top: 80,
  bottom: 0,
  width: 230,
  overflowY: "auto",
};

const listItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 0,
  margin: 0,
  listStyle: "none",
  marginBottom: 20,
  cursor: "pointer",
};

const iconPlaceholder: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  flex: "40px 0",
  marginRight: 20,
};

const textPlaceholder: React.CSSProperties = {
  borderRadius: 5,
  width: 200,
  height: 20,
  flex: 1,
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

import React, { useRef } from "react";
import { stagger, useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";
import { MenuItem } from "./MenuItem";
import { MENU_ITEMS } from "./Menu";

type NavigationProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const Navigation = ({ activeIndex, onSelect }: NavigationProps) => {
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
        {MENU_ITEMS.map((item, i) => (
          <MenuItem
            i={i}
            label={item.title}
            isActive={activeIndex === i}
            onSelect={() => onSelect(i)}
          />
        ))}
      </motion.ul>
    </>
  );
};

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
  zIndex: 2,
};

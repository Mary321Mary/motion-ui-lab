import React from "react";
import * as motion from "motion/react-client";

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

type MenuItemProps = {
  i: number;
  label: string;
  isActive: boolean;
  onSelect: () => void;
};

export const MenuItem = ({ i, label, isActive, onSelect }: MenuItemProps) => {
  const border = `2px solid ${colors[i]}`;

  return (
    <motion.li
      style={{
        ...listItem,
        cursor: "pointer",
        borderRadius: 8,
      }}
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onSelect}
    >
      <div
        style={{
          ...iconPlaceholder,
          border,
          backgroundColor: isActive ? colors[i] : "transparent",
        }}
      />
      <span
        style={{
          ...textPlaceholder,
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
          fontSize: 18,
          fontWeight: isActive ? 600 : 400,
          color: colors[i],
        }}
      >
        {label}
      </span>
    </motion.li>
  );
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF", "#44ff00"];

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

import React from "react";

export const BASKET_BOX = 56;

interface BasketTargetProps {
  basketRef: React.RefObject<HTMLDivElement | null>;
  ringRef: React.RefObject<HTMLDivElement | null>;
}

export default function BasketTarget({ basketRef, ringRef }: BasketTargetProps) {
  return (
    <div ref={basketRef} style={basket}>
      <div ref={ringRef} style={ring} />
      <BasketIcon />
    </div>
  );
}

function BasketIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
}

const basket: React.CSSProperties = {
  position: "absolute",
  top: 80,
  right: 80,
  width: BASKET_BOX,
  height: BASKET_BOX,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  border: "1px solid #67d9ff",
  color: "#67d9ff",
  willChange: "transform",
};

const ring: React.CSSProperties = {
  position: "absolute",
  inset: -1,
  border: "1px solid #67d9ff",
  opacity: 0,
  pointerEvents: "none",
  willChange: "transform, opacity",
};

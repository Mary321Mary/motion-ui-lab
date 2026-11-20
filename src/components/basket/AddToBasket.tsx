"use client";

import React, { useRef, useState } from "react";
import { arc, useAnimate, useMotionValue } from "motion/react";
import BasketProduct, { PRODUCT_SIZE } from "./BasketProduct";
import BasketTarget, { BASKET_BOX } from "./BasketTarget";

const FLY_SCALE = BASKET_BOX / PRODUCT_SIZE;

type Direction = "auto" | "cw" | "ccw";

interface AddToBasketProps {
  strength?: number;
  peak?: number;
  rotate?: number;
  duration?: number;
  basketVelocityFactor?: number;
  direction?: Direction;
}

/**
 * ==============   Components   ================
 */

export default function AddToBasket({
  strength = 0.5,
  peak = 0.15,
  rotate = 0.9,
  duration = 0.45,
  basketVelocityFactor = 0.05,
  direction = "cw",
}: AddToBasketProps = {}) {
  const [scope, animate] = useAnimate();
  const productRef = useRef<HTMLDivElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isFlying, setIsFlying] = useState(false);
  const productX = useMotionValue(0);
  const productY = useMotionValue(0);

  const addToBasket = async () => {
    const product = productRef.current;
    const basket = basketRef.current;
    const ring = ringRef.current;
    if (!product || !basket || !ring || isFlying) return;
    setIsFlying(true);

    const from = product.getBoundingClientRect();
    const to = basket.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    // Fly into the basket, shrinking to its size, then clip it away right
    // at the end so it disappears into the basket.
    await animate(
      product,
      {
        x: dx,
        y: dy,
        scale: FLY_SCALE,
        opacity: [1, 1, 0],
      },
      {
        duration,
        path: arc({
          strength,
          peak,
          rotate,
          direction: direction === "auto" ? undefined : direction,
        }),
        ease: [0.74, 0.18, 0.93, 0.69],
        opacity: { inherit: true, times: [0, 0.95, 1] },
      },
    );

    animate(
      basket,
      { x: 0, y: 0 },
      {
        type: "spring",
        stiffness: 500,
        damping: 12,
        x: {
          inherit: true,
          velocity: productX.getVelocity() * basketVelocityFactor,
        },
        y: {
          inherit: true,
          velocity: productY.getVelocity() * basketVelocityFactor,
        },
      },
    );

    // Ripple an outline out from the basket as it takes the hit.
    animate(
      ring, // волна
      {
        scale: [1, 2.2],
        opacity: [0.8, 0],
      },
      { duration: 0.5, ease: "easeOut" },
    );

    // Snap the now-invisible product back to its resting spot, ready to
    // reappear.
    animate(
      product,
      {
        x: 0,
        y: 0,
        scale: 0.9,
        rotate: 0,
        opacity: 0,
        clipPath: "inset(0%)",
      },
      { duration: 0 },
    );

    // Bring a fresh product back into view, scaling in with a slight bounce.
    await animate(
      product,
      { opacity: 1, scale: 1 },
      {
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.35 },
        opacity: { duration: 0.25, ease: "easeOut" },
      },
    );

    setIsFlying(false);
  };

  return (
    <div ref={scope} style={stage}>
      {/* Fill the sandbox so the basket sits in the true top-right. */}
      <style>{`#sandbox { position: relative }`}</style>
      <BasketTarget basketRef={basketRef} ringRef={ringRef} />
      <BasketProduct
        productRef={productRef}
        productX={productX}
        productY={productY}
        isFlying={isFlying}
        onAddToBasket={addToBasket}
      />
      <Stylesheet />
    </div>
  );
}

const stage: React.CSSProperties = {
  position: "absolute",
  top: "300px",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  color: "#67d9ff",
};

function Stylesheet() {
  return (
    <style>{`
    .dt-burst {
      position: absolute;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .dt-heart {
      opacity: 0;
      transform: scale(0);
      position: absolute;
      left: -48px;
      top: -48px;
      filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.25));
    }

    .dt-particle {
      position: absolute;
      left: -4px;
      top: -4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
    }

    .dt-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 8px 6px;
    }

    .dt-like {
      width: 36px;
      height: 36px;
      margin: -4px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .dt-like:focus-visible {
      outline: 2px solid #2563eb;
    }

    .dt-count {
      position: relative;
      display: flex;
      gap: 4px;
      font-size: 14px;
      font-weight: 600;
      color: #18222e;
      font-variant-numeric: tabular-nums;
    }

    .dt-count > span:first-child {
      display: inline-block;
    }

    .dt-unit {
      font-weight: 400;
      color: #60687a;
    }

    .dt-hint {
      margin-left: auto;
      font-size: 13px;
      color: #9aa1ae;
      white-space: nowrap;
    }

    @media (max-height: 420px) {
      .dt-hint {
        display: none;
      }
    }
    `}</style>
  );
}

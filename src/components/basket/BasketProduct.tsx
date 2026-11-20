import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import type { MotionValue, TapInfo } from "motion/react";
import HeartBurst, { type Burst } from "./HeartBurst";

export const PRODUCT_SIZE = 160;

interface BasketProductProps {
  productRef: React.RefObject<HTMLDivElement | null>;
  productX: MotionValue<number>;
  productY: MotionValue<number>;
  isFlying: boolean;
  onAddToBasket: () => void;
}

export default function BasketProduct({
  productRef,
  productX,
  productY,
  isFlying,
  onAddToBasket,
}: BasketProductProps) {
  const [likeButton, animateLike] = useAnimate();
  const [isLiked, setIsLiked] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);

  const setLiked = (liked: boolean) => {
    setIsLiked(liked);
    if (liked) {
      animateLike(likeButton.current, { scale: [1, 1.35, 1] }, lively);
    }
  };

  const onDoubleTap = (_event: PointerEvent, info: TapInfo) => {
    const product = productRef.current;
    if (!product) return;

    const rect = product.getBoundingClientRect();
    let x = info.point.x - window.scrollX - rect.left;
    let y = info.point.y - window.scrollY - rect.top;

    if (x <= 0 || y <= 0 || x >= rect.width || y >= rect.height) {
      x = rect.width / 2;
      y = rect.height / 2;
    }

    setBursts((current) => [
      ...current,
      { id: nextId.current++, x, y, rotate: Math.random() * 30 - 15 },
    ]);
    setLiked(true);
  };

  return (
    <div style={center}>
      <motion.div
        ref={productRef}
        tap={{ count: 2 }}
        onTap={onDoubleTap}
        style={{ ...product, x: productX, y: productY }}
      >
        <span style={glyph}>👟</span>
        {bursts.map((burst) => (
          <HeartBurst
            key={burst.id}
            {...burst}
            onDone={() => setBursts((current) => current.filter((item) => item.id !== burst.id))}
          />
        ))}
      </motion.div>

      <div className="dt-footer">
        <motion.button
          ref={likeButton}
          className="dt-like"
          onTap={() => setLiked(!isLiked)}
          whileTap={{ scale: 0.85 }}
          transition={ui}
          aria-label={isLiked ? "Unlike" : "Like"}
          aria-pressed={isLiked}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <motion.path
              d={heartPath}
              initial={false}
              animate={{
                fill: isLiked ? red : "rgba(255, 59, 92, 0)",
                stroke: isLiked ? red : "#18222e",
              }}
              transition={{ duration: 0.2 }}
              strokeWidth={1.75}
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
        <div className="dt-count">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={isLiked ? "liked" : "unliked"}
              initial={{
                y: isLiked ? 10 : -10,
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: isLiked ? -10 : 10, opacity: 0, filter: "blur(4px)" }}
              transition={ui}
            >
              {isLiked ? "1,249" : "1,248"}
            </motion.span>
          </AnimatePresence>
          <span className="dt-unit">likes</span>
        </div>
        <span className="dt-hint">Double tap the photo</span>
      </div>

      <div style={meta}>
        <span style={name}>Campus 00s</span>
        <span style={price}>£128</span>
      </div>

      <motion.button
        type="button"
        onClick={onAddToBasket}
        disabled={isFlying}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          ...button,
          opacity: isFlying ? 0.55 : 1,
          pointerEvents: isFlying ? "none" : "auto",
        }}
      >
        Add to basket
      </motion.button>
    </div>
  );
}

const lively = { type: "spring", stiffness: 622, damping: 17 } as const;
const ui = { type: "spring", stiffness: 305, damping: 33 } as const;
const red = "#ff3b5c";

const heartPath =
  "M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 6.9 4.5c2.1 0 3.6 1.2 5.1 3 1.5-1.8 3-3 5.1-3 3.5 0 5.5 3.5 4.2 6.8-1.8 4.6-9.3 9.2-9.3 9.2z";

const center: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 18,
};

const product: React.CSSProperties = {
  width: PRODUCT_SIZE,
  height: PRODUCT_SIZE,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
  border: "1px solid #67d9ff",
  willChange: "transform, opacity, clip-path",
};

const glyph: React.CSSProperties = {
  fontSize: 84,
  lineHeight: 1,
  userSelect: "none",
};

const meta: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: 12,
  fontSize: 13,
  letterSpacing: "0.04em",
};

const name: React.CSSProperties = {
  color: "#8a0000",
};

const price: React.CSSProperties = {
  color: "#67d9ff",
};

const button: React.CSSProperties = {
  marginTop: 4,
  padding: "13px 26px",
  border: "none",
  background: "#67d9ff",
  color: "#000",
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  cursor: "pointer",
};

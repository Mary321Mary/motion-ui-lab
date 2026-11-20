import React, { useEffect, useRef } from "react";
import { motion, useAnimate } from "motion/react";

export interface Burst {
  id: number;
  x: number;
  y: number;
  rotate: number;
}

interface HeartBurstProps extends Omit<Burst, "id"> {
  onDone: () => void;
}

export default function HeartBurst({ x, y, rotate, onDone }: HeartBurstProps) {
  const [scope, animate] = useAnimate();
  const heart = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const element = heart.current!;
    animate(
      element,
      { scale: [0, 1], opacity: [0, 1], rotate: [0, rotate] },
      {
        type: "spring",
        visualDuration: 0.3,
        bounce: 0.6,
        opacity: { duration: 0.1 },
      },
    );
    animate(
      scope.current,
      { y: -48, scale: 0.7, opacity: 0 },
      { duration: 0.35, ease: "easeIn", delay: 0.5 },
    ).then(onDone);
  }, []);

  return (
    <div ref={scope} className="dt-burst" style={{ left: x, top: y }}>
      {particles.map((angle, i) => (
        <motion.span
          key={i}
          className="dt-particle"
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos(angle) * 64,
            y: Math.sin(angle) * 64,
            scale: 0,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.06 }}
        />
      ))}
      <svg
        ref={heart}
        className="dt-heart"
        width="96"
        height="96"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={heartPath} fill="#ffffff" />
      </svg>
    </div>
  );
}

const heartPath =
  "M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 6.9 4.5c2.1 0 3.6 1.2 5.1 3 1.5-1.8 3-3 5.1-3 3.5 0 5.5 3.5 4.2 6.8-1.8 4.6-9.3 9.2-9.3 9.2z";

const particles = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2 - Math.PI / 2);

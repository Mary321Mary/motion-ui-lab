# Motion UI Lab — Interactive & Accessible Micro-Interactions

A curated collection of physics-based UI components and layout transitions built with **React**, **TypeScript**, and **Motion** (formerly Framer Motion).

This sandbox focuses on achieving native-feeling micro-interactions while maintaining strict performance standards (zero unnecessary React re-renders) and full screen-reader/keyboard accessibility.

🔗 **[Live Demo](https://motion-ui-lab.vercel.app)**

---

## Featured Components

### 1. `LongPress` — Gesture-Driven Unlock Button

A tactile hold-to-unlock control combining pointer gesture thresholds with synchronized SVG stroke animations.

- **Gesture & Animation Sync:** Coordinates `tap={{ hold }}` cancellation boundaries with linear `strokeDashoffset` progress and `onAnimationComplete` triggers.
- **Conditional Reset Physics:** Uses `useRef` and `custom` variant props to distinguish between an aborted press (spring rollback) and a post-unlock reset (instant zero-duration reset).
- **Feedback & A11y:** Includes mobile haptic feedback (`navigator.vibrate`) and `aria-live="polite"` status announcements.

### 2. `Stepper` — Kinetic Numerical Counter

A bounded numerical input (`0–99`) engineered for rapid hold-to-repeat interaction without stale state closures.

- **Rapid Hold-to-Repeat:** Uses `tap={{ hold, repeat }}` paired with a synchronous `useRef` tracker so fast increments never drop frames or lag behind React renders.
- **Direction-Aware Transitions:** Leverages `AnimatePresence` and `custom` direction multipliers to animate digits vertically up or down depending on increment/decrement direction.
- **Boundary Resistance:** Triggers an imperative horizontal shake (`useAnimate`) when hitting min/max limits while keeping controls focusable via `aria-disabled`.

### 3. `ScrollHorizontal` — Sticky Scroll-Linked Gallery

Transforms vertical page scrolling into smooth horizontal track movement without scroll-jacking.

- **Zero-Rerender Pipeline:** Maps vertical scroll progress (`useScroll`) directly to horizontal translation (`useTransform`) on the GPU compositor thread.
- **Responsive Bounds:** Dynamically recalculates track overflow widths via `ResizeObserver` / layout measurements to keep start and end positions aligned across viewports.

### 4. `LayoutAnchor` — FLIP Layout Transitions

Demonstrates shared-element and container expansion patterns without layout thrashing.

- **Origin-Controlled Expansion:** Uses `layout` and `layoutAnchor` properties to morph containers cleanly from specific anchor points while compensating for aspect-ratio distortion.

---

## Engineering Highlights

- **60fps Performance:** Heavy scroll and gesture loops run outside the React render cycle via `MotionValue` bindings and GPU-accelerated transforms (`x`, `y`, `scale`, `opacity`).
- **Spring Physics over Fixed Durations:** Tuned `stiffness`, `damping`, and `mass` parameters allow animations to preserve velocity and redirect smoothly when interrupted mid-flight.
- **Accessibility First:** Interactive states expose proper ARIA roles (`role="status"`, `aria-live`, `aria-disabled`) and respect reduced-motion preferences.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Mary321Mary/motion-ui-lab.git
cd motion-ui-lab

# Install dependencies
npm install

# Run the development server
npm run dev
```

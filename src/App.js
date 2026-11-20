import { lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { PATH } from "./path";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

const Home = lazy(() => import("pages/Home"));
const Scroll = lazy(() => import("pages/Scroll"));
const Content = lazy(() => import("pages/Content"));
const SvgAnimation = lazy(() => import("pages/SvgAnimation"));
const Basket = lazy(() => import("pages/Basket"));
const Menu = lazy(() => import("pages/Menu"));
const Shuffle = lazy(() => import("pages/Shuffle"));

const routes = [
  {
    path: PATH.HOME,
    element: <Home />,
  },
  {
    path: PATH.SCROLL,
    element: <Scroll />,
  },
  {
    path: PATH.CONTENT,
    element: <Content />,
  },
  {
    path: PATH.SVG_ANIMATION,
    element: <SvgAnimation />,
  },
  {
    path: PATH.BASKET,
    element: <Basket />,
  },
  {
    path: PATH.MENU,
    element: <Menu />,
  },
  {
    path: PATH.SHUFFLE,
    element: <Shuffle />,
  },
];

function App() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div>
      <motion.header
        className="header"
        animate={{
          y: hidden ? -140 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav>
          <a href={PATH.HOME}>Home</a>
          <a href={PATH.SCROLL}>Scroll</a>
          <a href={PATH.CONTENT}>Content</a>
          <a href={PATH.SVG_ANIMATION}>SVG animations</a>
          <a href={PATH.BASKET}>Basket</a>
          <a href={PATH.MENU}>Menu</a>
          <a href={PATH.SHUFFLE}>Shuffle</a>
        </nav>
      </motion.header>

      <main className="App">
        <Router>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;

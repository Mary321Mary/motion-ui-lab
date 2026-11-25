import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { PATH } from "./path";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { SiteFooter } from "./layout/Footer";

const Home = lazy(() => import("pages/Home"));
const Scroll = lazy(() => import("pages/Scroll"));
const Content = lazy(() => import("pages/Content"));
const SvgAnimation = lazy(() => import("pages/SvgAnimation"));
const Basket = lazy(() => import("pages/Basket"));
const Menu = lazy(() => import("pages/Menu"));

const routes = [
  { path: PATH.HOME, element: <Home /> },
  { path: PATH.SCROLL, element: <Scroll /> },
  { path: PATH.CONTENT, element: <Content /> },
  { path: PATH.SVG_ANIMATION, element: <SvgAnimation /> },
  { path: PATH.BASKET, element: <Basket /> },
  { path: PATH.MENU, element: <Menu /> },
];

const navigation = [
  { label: "Home", path: PATH.HOME },
  { label: "Scroll", path: PATH.SCROLL },
  { label: "Text", path: PATH.CONTENT },
  { label: "SVG", path: PATH.SVG_ANIMATION },
  { label: "Basket", path: PATH.BASKET },
  { label: "Menu", path: PATH.MENU },
];

function SiteLayout() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 150);
  });

  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <motion.header
        className={`site-header${menuOpen ? " menu-open" : ""}`}
        animate={{
          y: hidden && !menuOpen ? -120 : 0,
          opacity: hidden && !menuOpen ? 0 : 1,
        }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
      >
        <div className="header-inner">
          <Link className="brand" to={PATH.HOME} aria-label="Motion Lab home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="brand-name">
              motion<span>lab</span>
            </span>
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav
            id="primary-navigation"
            className={`primary-navigation${menuOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {navigation.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === PATH.HOME}
                className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.header>

      <main className="App" id="main-content">
        <Suspense fallback={<div className="route-loading">Loading experience…</div>}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}

function App() {
  return (
    <Router>
      <SiteLayout />
    </Router>
  );
}

export default App;

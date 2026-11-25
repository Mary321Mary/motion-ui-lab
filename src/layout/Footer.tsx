import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../path";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <Link className="brand footer-brand" to={PATH.HOME}>
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="brand-name">
              motion<span>lab</span>
            </span>
          </Link>
          <p>
            Small interactions. Big feeling.
            <br />A playground for motion on the web.
          </p>
        </div>

        <div className="footer-links">
          <span className="footer-label">Explore</span>
          <Link to={PATH.HOME}>Home</Link>
          <Link to={PATH.SCROLL}>Scroll effects</Link>
          <Link to={PATH.SVG_ANIMATION}>Text &amp; SVG</Link>
          <Link to={PATH.BASKET}>Micro-interactions</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Motion Lab</span>
        <a href="https://github.com/Mary321Mary/motion-ui-lab" target="_blank" rel="noreferrer">
          View source on GitHub <span aria-hidden="true">↗</span>
        </a>

        <span className="footer-status">
          <p>Made with React &amp; Motion</p>
        </span>
      </div>
    </footer>
  );
}

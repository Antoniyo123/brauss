import { useState, useEffect, useRef } from "react";
import "../styles/MainNav.css";
import logo from "../assets/logobraus.png";

const NAV_ITEMS = [
  { id: "home",      label: "Home",       sub: "Start here"  },
  { id: "about",     label: "About",      sub: "Our story"   },
  { id: "portfolio", label: "Portfolio",  sub: "Our work"    },
  { id: "contact",   label: "Contact Us", sub: "Say hello"   },
];

const MainNav = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);
  const [orbPos,  setOrbPos]  = useState({ x: 75, y: 45 });
  const [hovered, setHovered] = useState(null);
  const [curtain, setCurtain] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e) => setOrbPos({
    x: (e.clientX / window.innerWidth)  * 100,
    y: (e.clientY / window.innerHeight) * 100,
  });

  const handleClick = (id) => {
    if (busy.current) return;
    busy.current = true;
    setCurtain(true);
    setTimeout(() => onNavigate(id), 360);
    setTimeout(() => { setCurtain(false); busy.current = false; }, 880);
  };

  return (
    <>
      {curtain && <div className="mn-transition-curtain" />}

      <div
        className={`mn-root${visible ? " mn-visible" : ""}`}
        onMouseMove={handleMouseMove}
      >
        <div className="mn-bg" />
        <div className="mn-grain" />
        <div className="mn-orb" style={{ left: `${orbPos.x}%`, top: `${orbPos.y}%` }} />

        <div className="mn-spheres" aria-hidden="true">
          <div className="mn-sphere mn-sphere-1" />
          <div className="mn-sphere mn-sphere-2" />
          <div className="mn-sphere mn-sphere-3" />
          <div className="mn-sphere mn-sphere-4" />
          <div className="mn-sphere mn-sphere-5" />
        </div>

        <header className="mn-header">
          <img src={logo} alt="BRAUSS" className="mn-logo" />
          <span className="mn-header-meta">Jakarta Creative Studio</span>
        </header>

        <main className="mn-content">
          <nav className="mn-nav" aria-label="Main navigation">
            <ul className="mn-list">
              {NAV_ITEMS.map(({ id, label, sub }, i) => (
                <li
                  key={id}
                  className={[
                    "mn-item",
                    hovered === id            ? "mn-item--hovered" : "",
                    hovered && hovered !== id ? "mn-item--dimmed"  : "",
                  ].join(" ").trim()}
                  style={{ "--idx": i }}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <button className="mn-link" onClick={() => handleClick(id)}>
                    <span className="mn-num">0{i + 1}</span>
                    <span className="mn-label-wrap">
                      <span className="mn-label-main">{label}</span>
                      <span className="mn-label-sub">{sub}</span>
                    </span>
                    <span className="mn-arrow">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </main>

        <footer className="mn-footer">
          <div className="mn-footer-left">
            <span className="mn-footer-line" />
            <span className="mn-footer-text">Brauss Studio — Est. 2024</span>
          </div>
          <span className="mn-footer-right">© 2024 All Rights Reserved</span>
        </footer>
      </div>
    </>
  );
};

export default MainNav;
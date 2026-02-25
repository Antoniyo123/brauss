import { useState, useEffect } from "react";
import "../styles/Preloader.css";

import braussLogo from "../assets/logo-white.png";
import bgCity     from "../assets/jakarta background.jpeg";

const WORDS        = ["BE", "BRAVE", "BE", "BRAUSS"];
const CIRCLE_COUNT = 9;

const Preloader = ({ onEnter, exiting }) => {
  const [clicked,    setClicked]    = useState(false);
  const [cursorPos,  setCursorPos]  = useState({ x: -300, y: -300 });
  const [isHovering, setIsHovering] = useState(false);
  const [wiggle,     setWiggle]     = useState(false);
  const [ripples,    setRipples]    = useState([]);
  const [hint,       setHint]       = useState(false);
  const [wordsIn,    setWordsIn]    = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => { if (exiting) setClicked(true); }, [exiting]);

  useEffect(() => {
    const t = setTimeout(() => { setHint(true); setWordsIn(true); }, 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 800);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e) =>
    setCursorPos({ x: e.clientX, y: e.clientY });

  const handleBtnClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id   = Date.now();
    setRipples(p => [...p, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 1100);
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 200);
    setClicked(true);
    onEnter();
  };

  return (
    <>
      <svg className="pl-svg-filters" aria-hidden="true">
        <defs>
          <filter id="pl-wavy">
            <feTurbulence type="turbulence" baseFrequency="0.02 0.05" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency"
                values="0.02 0.05;0.03 0.07;0.02 0.05"
                dur="5s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div
        className={`pl-preloader${clicked ? " pl-exit" : ""}`}
        onMouseMove={handleMouseMove}
      >
        {/* ── Backgrounds ──────────────────────────────────── */}
        <div className="pl-bg-photo" style={{ backgroundImage: `url(${bgCity})` }} />
        <div className="pl-overlay-bloom" />
        <div className="pl-letterbox-top" />
        <div className="pl-letterbox-bottom" />
        <div className="pl-vignette" />
        <div className="pl-fade-bottom" />
        <div className="pl-fade-top" />
        <div className="pl-grain" />

        {/* ── Progress bar ─────────────────────────────────── */}
        <div className="pl-loader-bar" />

        {/* ── Corner ornaments ──────────────────────────────── */}
        <div className="pl-corner pl-corner--tl" />
        <div className="pl-corner pl-corner--tr" />
        <div className="pl-corner pl-corner--bl" />
        <div className="pl-corner pl-corner--br" />

        {/* ── Subtle particles ──────────────────────────────── */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="pl-particle"
            style={{
              width:     `${2 + Math.random() * 4}px`,
              height:    `${2 + Math.random() * 4}px`,
              left:      `${8 + Math.random() * 84}%`,
              top:       `${12 + Math.random() * 76}%`,
              "--dur":   `${6 + Math.random() * 6}s`,
              "--delay": `${Math.random() * 4}s`,
            }}
          />
        ))}

        {/* ── Main content ──────────────────────────────────── */}
        <div className="pl-content">
          <img
            src={braussLogo}
            alt="BRAUSS"
            className="pl-logo-img"
            draggable={false}
          />

          <p className="pl-meta">Jakarta · Creative Studio · Est. 2024</p>

          <div className="pl-btn-wrap">
            <p className={`pl-hint${hint ? " pl-hint-visible" : ""}`}>
              click to enter <span className="pl-hint-arrow">↓</span>
            </p>

            <button
              className={[
                "pl-btn",
                wiggle && !isHovering ? "pl-wiggle"  : "",
                btnClicked            ? "pl-clicked" : "",
              ].filter(Boolean).join(" ")}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleBtnClick}
            >
              <div className="pl-scallop">
                {Array.from({ length: CIRCLE_COUNT }).map((_, i) => (
                  <div key={i} className="pl-scallop-circle" />
                ))}

                <div className="pl-scallop-text">
                  {WORDS.map((word, i) => (
                    <span
                      key={i}
                      className="pl-word"
                      style={{
                        animationDelay: wordsIn ? `${i * 0.09}s` : "9999s",
                        marginRight: i === 1 ? "5px" : "0",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {ripples.map(({ id, x, y }) => (
                  <div
                    key={id}
                    className="pl-ripple"
                    style={{ width: 80, height: 80, left: x - 40, top: y - 40 }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* ── Bottom credit ──────────────────────────────────── */}
        <div className="pl-credit">
          <span className="pl-credit-line" />
          <span className="pl-credit-text">A Jakarta Creative Experience</span>
          <span className="pl-credit-line" />
        </div>

        {/* ── Custom cursor ──────────────────────────────────── */}
        <div
          className={`pl-cursor${isHovering ? " pl-hovering" : ""}`}
          style={{ left: cursorPos.x, top: cursorPos.y }}
          aria-hidden="true"
        >
          <div className="pl-cursor-ring" />
          <div className="pl-cursor-dot" />
          <div className="pl-cursor-label">enter</div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
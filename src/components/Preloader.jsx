import { useState, useEffect, useRef } from "react";
import "../styles/Preloader.css";

// ── Assets ──────────────────────────────────────────────────────
// Logo: place your file at src/assets/logobraus.png
import braussLogo from "../assets/logo-white.png";

// Background: place ANY dark city photo at src/assets/bg-city.jpg
// (download one from pexels.com → search "Jakarta night cityscape")
// Then Vite/CRA will bundle it and the URL will always resolve.
import bgCity from "../assets/jakarta background.jpeg";

// ── Words to animate per-word ────────────────────────────────────
const WORDS = ["BE", "BRAVE", "BE", "BRAUSS"];

// Number of scallop circles — enough to cover the text row
const CIRCLE_COUNT = 9;

const Preloader = ({ onEnter }) => {
  const [clicked,    setClicked]    = useState(false);
  const [cursorPos,  setCursorPos]  = useState({ x: -300, y: -300 });
  const [isHovering, setIsHovering] = useState(false);
  const [wiggle,     setWiggle]     = useState(false);
  const [ripples,    setRipples]    = useState([]);
  const [hint,       setHint]       = useState(false);
  const [wordsIn,    setWordsIn]    = useState(false);

  // Reveal hint + words after 1.6 s
  useEffect(() => {
    const t = setTimeout(() => {
      setHint(true);
      setWordsIn(true);
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  // Periodic wiggle
  useEffect(() => {
    const id = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 600);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleBtnClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id   = Date.now();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 750);

    setClicked(true);
    setTimeout(() => onEnter(), 950);
  };

  return (
    <>
      {/* Hidden SVG wavy filter */}
      <svg className="pl-svg-filters" aria-hidden="true">
        <defs>
          <filter id="pl-wavy">
            <feTurbulence type="turbulence" baseFrequency="0.02 0.05" numOctaves="2" result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.02 0.05;0.03 0.07;0.02 0.05"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div
        className={`pl-preloader${clicked ? " pl-exit" : ""}`}
        onMouseMove={handleMouseMove}
      >
        {/* ── Background layers ── */}
        {/* Inline style injects the bundled asset URL so it always resolves */}
        <div className="pl-bg-photo" style={{ backgroundImage: `url(${bgCity})` }} />
        <div className="pl-bg-glow" />
        <div className="pl-scanline" />
        <div className="pl-loader-bar" />

        {/* Corner brackets */}
        <div className="pl-corner pl-corner-tl" />
        <div className="pl-corner pl-corner-tr" />
        <div className="pl-corner pl-corner-bl" />
        <div className="pl-corner pl-corner-br" />

        {/* Floating particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="pl-particle"
            style={{
              width:     `${4 + Math.random() * 7}px`,
              height:    `${4 + Math.random() * 7}px`,
              left:      `${5  + Math.random() * 90}%`,
              top:       `${8  + Math.random() * 82}%`,
              "--dur":   `${3  + Math.random() * 4}s`,
              "--delay": `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* ── Centre content ── */}
        <div className="pl-content">

          {/* Logo */}
          <img
            src={braussLogo}
            alt="BRAUSS"
            className="pl-logo-img"
            draggable={false}
          />

          {/* Hint + Scallop button */}
          <div className="pl-btn-wrap">
            <p className={`pl-hint${hint ? " pl-hint-visible" : ""}`}>
              click to enter&nbsp;<span className="pl-hint-arrow">↓</span>
            </p>

            <button
              className={`pl-btn${wiggle && !isHovering ? " pl-wiggle" : ""}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleBtnClick}
            >
              <div className="pl-scallop">
                {/* Background circles */}
                {Array.from({ length: CIRCLE_COUNT }).map((_, i) => (
                  <div key={i} className="pl-scallop-circle" />
                ))}

                {/* Words animated in one by one */}
                <div className="pl-scallop-text">
                  {WORDS.map((word, i) => (
                    <span
                      key={i}
                      className="pl-word"
                      style={{
                        animationDelay: wordsIn ? `${i * 0.12}s` : "9999s",
                        // separator dot between "BRAVE" and second "BE"
                        marginRight: i === 1 ? "8px" : "0",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* Ripple effects */}
                {ripples.map(({ id, x, y }) => (
                  <div
                    key={id}
                    className="pl-ripple"
                    style={{ width: 64, height: 64, left: x - 32, top: y - 32 }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* ── Custom cursor ── */}
        <div
          className={`pl-cursor${isHovering ? " pl-hovering" : ""}`}
          style={{ left: cursorPos.x, top: cursorPos.y }}
          aria-hidden="true"
        >
          <div className="pl-cursor-ring" />
          <div className="pl-cursor-dot" />
          <div className="pl-cursor-label">ENTER</div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
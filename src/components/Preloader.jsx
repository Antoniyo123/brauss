import { useState, useEffect } from "react";
import "../styles/Preloader.css";

import braussLogo from "../assets/logo-white.png";
import bgCity from "../assets/jakarta background.jpeg";

const WORDS = ["BE", "BRAVE", "BE", "BRAUSS"];
const CIRCLE_COUNT = 9;

const Preloader = ({ onEnter, exiting }) => {
  const [clicked, setClicked] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });
  const [isHovering, setIsHovering] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [hint, setHint] = useState(false);
  const [wordsIn, setWordsIn] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  // Efek untuk merespon prop exiting dari App
  useEffect(() => {
    if (exiting) {
      setClicked(true);
    }
  }, [exiting]);

  // Munculkan hint dan kata setelah 1.6 detik
  useEffect(() => {
    const t = setTimeout(() => {
      setHint(true);
      setWordsIn(true);
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  // Wiggle periodik pada tombol
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
    const id = Date.now();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000);

    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 200);

    setClicked(true);
    onEnter(); // Beri tahu App bahwa tombol diklik
  };

  return (
    <>
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
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className={`pl-preloader${clicked ? " pl-exit" : ""}`} onMouseMove={handleMouseMove}>
        <div className="pl-bg-photo" style={{ backgroundImage: `url(${bgCity})` }} />
        <div className="pl-bg-glow" />
        <div className="pl-scanline" />
        <div className="pl-loader-bar" />

        {/* Partikel debu */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="pl-particle"
            style={{
              width: `${4 + Math.random() * 7}px`,
              height: `${4 + Math.random() * 7}px`,
              left: `${5 + Math.random() * 90}%`,
              top: `${8 + Math.random() * 82}%`,
              "--dur": `${3 + Math.random() * 4}s`,
              "--delay": `${Math.random() * 3}s`,
            }}
          />
        ))}

        <div className="pl-content">
          <img src={braussLogo} alt="BRAUSS" className="pl-logo-img" draggable={false} />

          <div className="pl-btn-wrap">
            <p className={`pl-hint${hint ? " pl-hint-visible" : ""}`}>
              click to enter&nbsp;<span className="pl-hint-arrow">↓</span>
            </p>

            <button
              className={`pl-btn${wiggle && !isHovering ? " pl-wiggle" : ""}${btnClicked ? " pl-clicked" : ""}`}
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
                        animationDelay: wordsIn ? `${i * 0.12}s` : "9999s",
                        marginRight: i === 1 ? "8px" : "0",
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

        {/* Kursor kustom */}
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
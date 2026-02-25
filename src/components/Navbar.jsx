import { useEffect, useState, useRef, useCallback } from "react"
import "../styles/Navbar.css"
import logo from "../assets/logobraus.png"

const LINKS = [
  { id: "home",      label: "Home"      },
  { id: "about",     label: "About"     },
  { id: "portfolio", label: "Portfolio" },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [onLight,   setOnLight]   = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState("home")
  const logoRef = useRef(null)

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    function checkScroll() {
      setScrolled(window.scrollY > 60)
      const logoEl = logoRef.current
      if (!logoEl) return
      const { left, top, width, height } = logoEl.getBoundingClientRect()
      logoEl.style.visibility = "hidden"
      const el0 = document.elementFromPoint(left + width / 2, top + height / 2)
      logoEl.style.visibility = ""
      if (!el0) return
      let el = el0
      while (el && el !== document.body) {
        const bg = window.getComputedStyle(el).backgroundColor
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
          if (m) {
            const lum = 0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]
            setOnLight(lum > 180)
          }
          break
        }
        el = el.parentElement
      }
    }

    function trackSection() {
      const ids = [...LINKS.map(l => l.id), "contact"]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom > 120) { setActive(id); break }
      }
    }

    checkScroll(); trackSection()
    window.addEventListener("scroll", checkScroll,  { passive: true })
    window.addEventListener("scroll", trackSection, { passive: true })
    window.addEventListener("resize", checkScroll,  { passive: true })
    return () => {
      window.removeEventListener("scroll", checkScroll)
      window.removeEventListener("scroll", trackSection)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        {LINKS.map(l => (
          <button key={l.id} onClick={() => scrollTo(l.id)}
            className={active === l.id ? "active" : ""}
            tabIndex={menuOpen ? 0 : -1}>
            {l.label}
          </button>
        ))}
        <button onClick={() => scrollTo("contact")}
          className={active === "contact" ? "active" : ""}
          tabIndex={menuOpen ? 0 : -1}>
          Contact Us
        </button>
      </div>

      {/* Navbar */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* ↓ This inner wrapper becomes the pill on scroll */}
        <div className="navbar-inner">

          <div className="nav-logo" ref={logoRef} role="button" tabIndex={0}
            onClick={() => scrollTo("home")}
            onKeyDown={e => e.key === "Enter" && scrollTo("home")}
            style={{ cursor: "pointer" }}>
            <img src={logo} alt="Brauss Logo" className={onLight ? "on-light" : ""} />
          </div>

          <ul className="nav-links">
            {LINKS.map(l => (
              <li key={l.id}>
                <button className={active === l.id ? "active" : ""}
                  onClick={() => scrollTo(l.id)}>
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button className={`nav-cta${active === "contact" ? " active" : ""}`}
                onClick={() => scrollTo("contact")}>
                Contact Us
              </button>
            </li>
          </ul>

          <button className={`nav-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>

        </div>
      </nav>
    </>
  )
}
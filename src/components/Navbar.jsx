import { useEffect, useState, useRef } from "react"
import "../styles/Navbar.css"
import logo from "../assets/logobraus.png"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [onLight, setOnLight]   = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState("home")
  const logoRef                 = useRef(null)

  useEffect(() => {
    function check() {
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
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
          if (match) {
            const lum = 0.299 * +match[1] + 0.587 * +match[2] + 0.114 * +match[3]
            setOnLight(lum > 180)
          }
          break
        }
        el = el.parentElement
      }
    }

    function trackSection() {
      const sections = ["home", "about", "portfolio", "contact"]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom > 120) { setActive(id); break }
      }
    }

    check()
    window.addEventListener("scroll", check,        { passive: true })
    window.addEventListener("scroll", trackSection, { passive: true })
    window.addEventListener("resize", check,        { passive: true })
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("scroll", trackSection)
      window.removeEventListener("resize", check)
    }
  }, [])

  const links = [
    { href: "#home",      label: "Home",      id: "home"      },
    { href: "#about",     label: "About",     id: "about"     },
    { href: "#portfolio", label: "Portfolio", id: "portfolio" },
  ]

  return (
    <>
      {/* Mobile fullscreen drawer */}
      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <a key={l.id} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        {/* Logo */}
        <div className="nav-logo" ref={logoRef}>
          <img
            src={logo}
            alt="Brauss Logo"
            className={onLight ? "on-light" : ""}
          />
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a href={l.href} className={active === l.id ? "active" : ""}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={`nav-cta ${active === "contact" ? "active" : ""}`}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

      </nav>
    </>
  )
}
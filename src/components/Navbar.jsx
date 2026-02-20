import { useEffect, useState, useRef } from "react"
import "../styles/Navbar.css"
import logo from "../assets/logobraus.png"

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [onLight, setOnLight]         = useState(false)   // true = logo di atas bg terang
  const logoRef                       = useRef(null)

  useEffect(() => {
    function check() {
      const scrollY = window.scrollY

      // ── Scrolled state ──
      setScrolled(scrollY > 50)

      // ── Deteksi apakah logo sedang di atas section cream/putih ──
      // Ambil titik tengah logo di layar
      const logoEl = logoRef.current
      if (!logoEl) return

      const { left, top, width, height } = logoEl.getBoundingClientRect()
      const checkX = left + width / 2
      const checkY = top  + height / 2

      // Sembunyikan logo sementara agar tidak ikut terdeteksi
      logoEl.style.visibility = "hidden"
      const elementBelow = document.elementFromPoint(checkX, checkY)
      logoEl.style.visibility = ""

      if (!elementBelow) return

      // Cari background computed dari element di bawah logo ke atas
      let el = elementBelow
      while (el && el !== document.body) {
        const bg = window.getComputedStyle(el).backgroundColor
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          // Parse rgb values
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
          if (match) {
            const r = parseInt(match[1])
            const g = parseInt(match[2])
            const b = parseInt(match[3])
            // Luminance check: terang kalau mendekati #fff5e3 atau putih
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b)
            setOnLight(luminance > 180)
          }
          break
        }
        el = el.parentElement
      }
    }

    check()
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check, { passive: true })

    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [])

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" ref={logoRef}>
        <img
          src={logo}
          alt="Brauss Logo"
          className={onLight ? "logo-on-light" : ""}
        />
      </div>

      <ul className="nav-menu">
        <li><a href="#home">HOME</a></li>
        <li><a href="#about">ABOUT</a></li>
        <li><a href="#portfolio">PORTFOLIO</a></li>
        <li><a href="#contact">CONTACT US</a></li>
      </ul>
    </nav>
  )
}
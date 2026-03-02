import { useEffect, useRef } from "react"
import "../styles/Footer.css"
import logo from "../assets/logobraus.png"

export default function Footer() {
  const footerRef    = useRef(null)
  // CTA section
  const ctaHeadRef   = useRef(null)
  const ctaEyeRef    = useRef(null)
  const ctaRightRef  = useRef(null)
  // Body
  const logoRef      = useRef(null)
  const descRef      = useRef(null)
  const socialsRef   = useRef(null)
  const navColRef    = useRef(null)
  const contactColRef= useRef(null)
  // Decorative
  const orb1Ref      = useRef(null)
  const orb2Ref      = useRef(null)
  const barRef       = useRef(null)

  useEffect(() => {
    const scroll = { current: 0, target: 0 }
    const mouse  = { x: 0, y: 0, cx: 0, cy: 0 }
    let rafId

    const onScroll = () => {
      const el = footerRef.current
      if (!el) return
      scroll.target = Math.max(0, -el.getBoundingClientRect().top)
    }
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      scroll.current += (scroll.target - scroll.current) * 0.07
      mouse.cx += (mouse.x - mouse.cx) * 0.055
      mouse.cy += (mouse.y - mouse.cy) * 0.055
      const y = scroll.current, mx = mouse.cx, my = mouse.cy

      // ── CTA heading — fastest, most dramatic
      if (ctaEyeRef.current)
        ctaEyeRef.current.style.transform  = `translateY(${y * -0.22}px) translate(${mx * -8}px, ${my * -4}px)`
      if (ctaHeadRef.current)
        ctaHeadRef.current.style.transform = `translateY(${y * -0.17}px) translate(${mx * -6}px, ${my * -5}px)`
      if (ctaRightRef.current)
        ctaRightRef.current.style.transform= `translateY(${y * -0.12}px) translate(${mx * 4}px, ${my * 2}px)`

      // ── Body — staggered per element
      if (logoRef.current)
        logoRef.current.style.transform    = `translateY(${y * -0.10}px) translate(${mx * -4}px, ${my * -2}px)`
      if (descRef.current)
        descRef.current.style.transform    = `translateY(${y * -0.07}px) translate(${mx * -3}px, ${my * -1.5}px)`
      if (socialsRef.current)
        socialsRef.current.style.transform = `translateY(${y * -0.05}px)`
      if (navColRef.current)
        navColRef.current.style.transform  = `translateY(${y * -0.08}px) translate(${mx * 3}px, ${my * 2}px)`
      if (contactColRef.current)
        contactColRef.current.style.transform = `translateY(${y * -0.06}px) translate(${mx * 5}px, ${my * 3}px)`

      // ── Bottom bar — slowest
      if (barRef.current)
        barRef.current.style.transform     = `translateY(${y * -0.03}px)`

      // ── Background orbs — counter-mouse
      if (orb1Ref.current)
        orb1Ref.current.style.transform    = `translate(${mx * 20}px, ${my * 14}px)`
      if (orb2Ref.current)
        orb2Ref.current.style.transform    = `translate(${mx * -14}px, ${my * -10}px)`
    }

    window.addEventListener("scroll",    onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse,  { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <footer className="footer" ref={footerRef}>

      {/* ── Parallax background orbs ── */}
      <div className="footer-orb footer-orb-1" ref={orb1Ref} aria-hidden="true" />
      <div className="footer-orb footer-orb-2" ref={orb2Ref} aria-hidden="true" />

      {/* ══ CTA STRIP ══ */}
      <div className="footer-cta">
        <div className="footer-cta-inner">

          <div className="footer-cta-left">
            <span className="footer-cta-eyebrow" ref={ctaEyeRef}>Ready to start?</span>
            <h2 className="footer-cta-heading" ref={ctaHeadRef}>
              Let's build<br />something<br />great.
            </h2>
          </div>

          <div className="footer-cta-divider" aria-hidden="true" />

          <div className="footer-cta-right" ref={ctaRightRef}>
            <p className="footer-cta-sub">
              Have a project in mind? Let's talk.<br />
              We'd love to hear from you.
            </p>
            <a href="#contact" className="footer-cta-btn">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="mailto:hello@braussnetworks.com" className="footer-cta-email">
              hello@braussnetworks.com
            </a>
          </div>

        </div>
      </div>

      {/* ══ MAIN BODY ══ */}
      <div className="footer-body">

        {/* LEFT — brand block */}
        <div className="footer-left">
          <img src={logo} alt="Brauss" className="footer-logo" ref={logoRef} />
          <p className="footer-desc" ref={descRef}>
            A creative house developing original ideas,
            brand experiences and intellectual properties
            with long‑term value.
          </p>
          <div className="footer-socials" ref={socialsRef}>
            <a href="https://instagram.com/braussnetworks" target="_blank" rel="noopener noreferrer" className="footer-social">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>
            <a href="https://linkedin.com/company/brauss" target="_blank" rel="noopener noreferrer" className="footer-social">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* DIVIDER vertical */}
        <div className="footer-vdivider" aria-hidden="true" />

        {/* RIGHT — nav + contact */}
        <div className="footer-right">

          <div className="footer-col" ref={navColRef}>
            <span className="footer-col-label">Navigate</span>
            <ul className="footer-nav">
              {["Home","About","Services","Contact Us"].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ","-")}`} className="footer-nav-link">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" ref={contactColRef}>
            <span className="footer-col-label">Contact</span>
            <a href="mailto:hello@braussnetworks.com" className="footer-email">
              hello@braussnetworks.com
            </a>
            <address className="footer-address">
              18 Office Park, 10th A Floor<br />
              Jl. TB Simatupang No. 18<br />
              Jakarta Selatan 12520
            </address>
          </div>

        </div>
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className="footer-bar" ref={barRef}>
        <span>© 2026 Brauss Group. All rights reserved.</span>
        <span className="footer-bar-divot" aria-hidden="true" />
        <span>PT Bumintara Dira Mandaya</span>
      </div>

    </footer>
  )
}
import { useEffect, useRef } from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Footer.css"
import logo from "../assets/logobraus.png"

export default function Footer() {
  const { t, tArr } = useLanguage()

  const footerRef     = useRef(null)
  const ctaHeadRef    = useRef(null)
  const ctaEyeRef     = useRef(null)
  const ctaRightRef   = useRef(null)
  const logoRef       = useRef(null)
  const descRef       = useRef(null)
  const socialsRef    = useRef(null)
  const navColRef     = useRef(null)
  const contactColRef = useRef(null)
  const orb1Ref       = useRef(null)
  const orb2Ref       = useRef(null)
  const barRef        = useRef(null)

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

      if (ctaEyeRef.current)
        ctaEyeRef.current.style.transform   = `translateY(${y * -0.22}px) translate(${mx * -8}px, ${my * -4}px)`
      if (ctaHeadRef.current)
        ctaHeadRef.current.style.transform  = `translateY(${y * -0.17}px) translate(${mx * -6}px, ${my * -5}px)`
      if (ctaRightRef.current)
        ctaRightRef.current.style.transform = `translateY(${y * -0.12}px) translate(${mx * 4}px, ${my * 2}px)`
      if (logoRef.current)
        logoRef.current.style.transform     = `translateY(${y * -0.10}px) translate(${mx * -4}px, ${my * -2}px)`
      if (descRef.current)
        descRef.current.style.transform     = `translateY(${y * -0.07}px) translate(${mx * -3}px, ${my * -1.5}px)`
      if (socialsRef.current)
        socialsRef.current.style.transform  = `translateY(${y * -0.05}px)`
      if (navColRef.current)
        navColRef.current.style.transform   = `translateY(${y * -0.08}px) translate(${mx * 3}px, ${my * 2}px)`
      if (contactColRef.current)
        contactColRef.current.style.transform = `translateY(${y * -0.06}px) translate(${mx * 5}px, ${my * 3}px)`
      if (barRef.current)
        barRef.current.style.transform      = `translateY(${y * -0.03}px)`
      if (orb1Ref.current)
        orb1Ref.current.style.transform     = `translate(${mx * 20}px, ${my * 14}px)`
      if (orb2Ref.current)
        orb2Ref.current.style.transform     = `translate(${mx * -14}px, ${my * -10}px)`
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

  const ctaHeadLines = t("footerCtaHeading").split("\n")
  const ctaSubLines  = t("footerCtaSub").split("\n")
  const addressLines = t("footerAddress").split("\n")
  const navItems     = tArr("footerNavItems")
  const navHrefs     = ["#home","#services","#about","#contact"]

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-orb footer-orb-1" ref={orb1Ref} aria-hidden="true" />
      <div className="footer-orb footer-orb-2" ref={orb2Ref} aria-hidden="true" />

      {/* ══ CTA STRIP ══ */}
      <div className="footer-cta">
        <div className="footer-cta-inner">

          <div className="footer-cta-left">
            <span className="footer-cta-eyebrow" ref={ctaEyeRef}>{t("footerCtaEyebrow")}</span>
            <h2 className="footer-cta-heading" ref={ctaHeadRef}>
              {ctaHeadLines.map((line, i) => (
                <span key={i}>{line}{i < ctaHeadLines.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>

          <div className="footer-cta-divider" aria-hidden="true" />

          <div className="footer-cta-right" ref={ctaRightRef}>
            <p className="footer-cta-sub">
              {ctaSubLines.map((line, i) => (
                <span key={i}>{line}{i < ctaSubLines.length - 1 && <br />}</span>
              ))}
            </p>
            <a href="#contact" className="footer-cta-btn">
              {t("footerCtaBtn")}
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

        <div className="footer-left">
          <img src={logo} alt="Brauss" className="footer-logo" ref={logoRef} />
          <p className="footer-desc" ref={descRef}>{t("footerDesc")}</p>
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

        <div className="footer-vdivider" aria-hidden="true" />

        <div className="footer-right">
          <div className="footer-col" ref={navColRef}>
            <span className="footer-col-label">{t("footerNavLabel")}</span>
            <ul className="footer-nav">
              {navItems.map((label, i) => (
                <li key={label}>
                  <a href={navHrefs[i]} className="footer-nav-link">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" ref={contactColRef}>
            <span className="footer-col-label">{t("footerContactLabel")}</span>
            <a href="mailto:hello@braussnetworks.com" className="footer-email">
              hello@braussnetworks.com
            </a>
            <address className="footer-address">
              {addressLines.map((line, i) => (
                <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
              ))}
            </address>
          </div>
        </div>

      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className="footer-bar" ref={barRef}>
        <span>{t("footerRights")}</span>
        <span className="footer-bar-divot" aria-hidden="true" />
        <span>{t("footerEntity")}</span>
      </div>

    </footer>
  )
}
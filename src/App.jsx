import { useState, useEffect } from "react"
import Preloader  from "./components/Preloader"
import PageReveal from "./components/PageReveal"
import MainNav    from "./components/MainNav"
import Navbar     from "./components/Navbar"
import Home       from "./components/Hero"
import Services   from "./components/Services"
import Contact    from "./components/Contact"
import Portfolio  from "./components/Portfolio"
import TrustedBy  from "./components/TrustedBy"
import Footer     from "./components/Footer"

/*
  PHASE MACHINE (simplified)
  ─────────────────────────────────────────────────────
  "idle"          → Preloader shown
  "exiting"       → Preloader fades, burst fires
  "nav"           → MainNav fullscreen shown
  "transitioning" → MainNav fades, burst fires
  "page"          → Full page shown, scroll to target
  ─────────────────────────────────────────────────────
*/

function App() {
  const [phase,    setPhase]    = useState("idle")
  const [target,   setTarget]   = useState("home")
  const [burstKey, setBurstKey] = useState(0)

  /* ── Preloader done → show MainNav ─────────────── */
  const handlePreloaderEnter = () => {
    if (phase !== "idle") return
    setBurstKey(k => k + 1)
    setPhase("exiting")
    setTimeout(() => setPhase("nav"), 950)
  }

  /* ── MainNav item clicked → go straight to page ── */
  const handleNavigate = (id) => {
    if (phase !== "nav") return
    setTarget(id)
    setBurstKey(k => k + 1)
    setPhase("transitioning")
    setTimeout(() => setPhase("page"), 950)
  }

  /* ── Scroll to target after page mounts ─────────── */
  useEffect(() => {
    if (phase !== "page") return
    const t = setTimeout(() => {
      const el = document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 120)
    return () => clearTimeout(t)
  }, [phase, target])

  return (
    <>
      {/* Preloader */}
      {(phase === "idle" || phase === "exiting") && (
        <Preloader
          onEnter={handlePreloaderEnter}
          exiting={phase === "exiting"}
        />
      )}

      {/* Burst overlay */}
      {(phase === "exiting" || phase === "transitioning") && (
        <PageReveal key={burstKey} active />
      )}

      {/* Fullscreen nav menu — only shown between preloader and page */}
      {phase === "nav" && (
        <MainNav onNavigate={handleNavigate} />
      )}

      {/* Full scrollable page */}
      {phase === "page" && (
        <div className="page-enter">
          <Navbar />
          <section id="home">     <Home />      </section>
          <section id="portfolio"><Portfolio />  </section>
          <section id="services"> <Services />   </section>
          <section id="about">    <TrustedBy />  </section>
          <section id="contact">  <Contact />    </section>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
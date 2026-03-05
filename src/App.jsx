import { useState, useEffect } from "react"
import { LanguageProvider } from "./context/LanguageContext"  // ← import provider

import Preloader  from "./components/Preloader"
import PageReveal from "./components/PageReveal"
import BrandLoader from "./components/BrandLoader"
import Navbar     from "./components/Navbar"
import Home       from "./components/Hero"
import Contact    from "./components/Contact"
import Portfolio  from "./components/Portfolio"
import TrustedBy  from "./components/TrustedBy"
import Footer     from "./components/Footer"

function AppContent() {
  const [phase,    setPhase]    = useState("idle")
  const [burstKey, setBurstKey] = useState(0)

  const handlePreloaderEnter = () => {
    if (phase !== "idle") return
    setBurstKey(k => k + 1)
    setPhase("exiting")
    setTimeout(() => setPhase("brand"), 950)
  }

  const handleBrandComplete = () => {
    setBurstKey(k => k + 1)
    setPhase("transitioning")
    setTimeout(() => setPhase("page"), 950)
  }

  useEffect(() => {
    if (phase !== "page") return
    const timer = setTimeout(() => {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 120)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <>
      {(phase === "idle" || phase === "exiting") && (
        <Preloader onEnter={handlePreloaderEnter} exiting={phase === "exiting"} />
      )}

      {(phase === "exiting" || phase === "transitioning") && (
        <PageReveal key={burstKey} active />
      )}

      {phase === "brand" && (
        <BrandLoader onComplete={handleBrandComplete} />
      )}

      {phase === "page" && (
        <div className="page-enter">
          <Navbar />
          <section id="home">      <Home />      </section>
          <section id="portfolio"> <Portfolio />  </section>
          
          <section id="about">     <TrustedBy />  </section>
          
          <section id="contact">   <Contact />    </section>
          <Footer />
        </div>
      )}
    </>
  )
}

/* LanguageProvider membungkus seluruh app agar semua komponen
   bisa akses bahasa via useLanguage() hook                     */
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
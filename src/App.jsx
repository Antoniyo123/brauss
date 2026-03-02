import { useState, useEffect } from "react"
import Preloader  from "./components/Preloader"
import PageReveal from "./components/PageReveal"
import BrandLoader from "./components/BrandLoader"  // komponen baru
import Navbar     from "./components/Navbar"
import Home       from "./components/Hero"
import Services   from "./components/Services"
import Contact    from "./components/Contact"
import Portfolio  from "./components/Portfolio"
import TrustedBy  from "./components/TrustedBy"
import Footer     from "./components/Footer"

function App() {
  const [phase,    setPhase]    = useState("idle")
  const [burstKey, setBurstKey] = useState(0)

  // Preloader selesai → masuk ke brand loader
  const handlePreloaderEnter = () => {
    if (phase !== "idle") return
    setBurstKey(k => k + 1)          // burst pertama
    setPhase("exiting")
    setTimeout(() => setPhase("brand"), 950) // durasi preloader exit
  }

  // Brand loader selesai → transisi ke halaman utama
  const handleBrandComplete = () => {
    setBurstKey(k => k + 1)          // burst kedua
    setPhase("transitioning")
    setTimeout(() => setPhase("page"), 950)
  }

  // Scroll ke home setelah page muncul
  useEffect(() => {
    if (phase !== "page") return
    const timer = setTimeout(() => {
      const homeSection = document.getElementById("home")
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 120)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <>
      {/* Preloader (idle / exiting) */}
      {(phase === "idle" || phase === "exiting") && (
        <Preloader
          onEnter={handlePreloaderEnter}
          exiting={phase === "exiting"}
        />
      )}

      {/* Burst overlay untuk kedua transisi */}
      {(phase === "exiting" || phase === "transitioning") && (
        <PageReveal key={burstKey} active />
      )}

      {/* Brand Loader */}
      {phase === "brand" && (
        <BrandLoader onComplete={handleBrandComplete} />
      )}

      {/* Halaman utama */}
      {phase === "page" && (
        <div className="page-enter">
          <Navbar />
          <section id="home">     <Home />      </section>
          <section id="portfolio"><Portfolio />  </section>
          <section id="about">    <TrustedBy />  </section>
          <section id="contact">  <Contact />    </section>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
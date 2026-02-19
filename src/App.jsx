import { useState } from "react"
import Preloader from "./components/Preloader"
import Navbar from "./components/Navbar"
import Home from "./components/Hero"
import Services from "./components/Services"
import Contact from "./components/Contact"
import Portfolio from "./components/Portfolio"
import TrustedBy from "./components/TrustedBy"
import Footer from "./components/Footer"

function App() {
  const [entered, setEntered] = useState(false)

  return (
    <>
      {!entered && <Preloader onEnter={() => setEntered(true)} />}
      {entered && (
        <>
          <Navbar />
          <Home />
          <TrustedBy />
          <Services />
          <Portfolio />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
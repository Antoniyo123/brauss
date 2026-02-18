import Navbar from "./components/Navbar"

import Home from "./components/Hero"
import Services from "./components/Services"
import Contact from "./components/Contact"
// import AboutSection from "./components/AboutSection"
import Portfolio from "./components/Portfolio"
import TrustedBy from "./components/TrustedBy"


function App() {
  return (
    <>
      <Navbar />
      <Home />
      <TrustedBy />
      {/* <AboutSection /> */}
      <Services />
      <Portfolio />
      <Contact />
     
      
    </>
  )
}

export default App


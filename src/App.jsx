import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./components/Hero"
import Services from "./components/Services"
import Contact from "./components/Contact"
// import AboutSection from "./components/AboutSection"


function App() {
  return (
    <>
      <Navbar />
      <Home />
      {/* <AboutSection /> */}
      <Services />
      <Contact />
      <Footer />
      
    </>
  )
}

export default App


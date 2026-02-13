import { useEffect, useState } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container nav-inner">
        <div className="logo">Alex Studio</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Work</li>
          <li>About</li>
          <li><button className="nav-btn">Contact</button></li>
        </ul>
      </div>
    </nav>
  )
}

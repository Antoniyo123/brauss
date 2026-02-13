import { useEffect, useState } from "react"
import ThreeScene from "./ThreeScene"

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="hero">
      <div className="gradient-bg"></div>

      <div className={`hero-container ${visible ? "show" : ""}`}>
        <div className="hero-text">
          <span className="badge">Creative Digital Studio</span>

          <h1>
            Designing Future
            <span> Digital Brands</span>
          </h1>

          <p>
            We combine strategy, creativity, and technology to build
            impactful digital experiences that feel alive.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Start Project</button>
            <button className="secondary-btn">View Work</button>
          </div>
        </div>

        <div className="three-wrapper">
          <ThreeScene />
        </div>
      </div>
    </section>
  )
}

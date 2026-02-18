import { useRef, useState } from "react"
import "../styles/Services.css"

const items = [
  { caption: "Lorem ipsum dolor sit amet, consectetuer" },
  { caption: "Lorem ipsum dolor sit amet, consectetuer" },
  { caption: "Lorem ipsum dolor sit amet, consectetuer" },
  { caption: "Lorem ipsum dolor sit amet, consectetuer" },
  { caption: "Lorem ipsum dolor sit amet, consectetuer" },
  { caption: "Lorem ipsum dolor sit amet, consectetuer" },
]

export default function Services() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const visible = 3.4   // how many cards visible at once (3 full + partial 4th)

  const prev = () => {
    const next = Math.max(0, index - 1)
    setIndex(next)
    scroll(next)
  }

  const next = () => {
    const max = items.length - Math.floor(visible)
    const nextIdx = Math.min(max, index + 1)
    setIndex(nextIdx)
    scroll(nextIdx)
  }

  const scroll = (i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector(".pf-card")
    if (!card) return
    const cardW = card.offsetWidth + 24 // card width + gap
    track.scrollTo({ left: i * cardW, behavior: "smooth" })
  }

  return (
    <section className="portfolio">
      <div className="portfolio-outer">
        <h2 className="portfolio-title">Selected Portfolio</h2>

        <div className="portfolio-carousel-wrap">
          {/* Left arrow */}
          <button className="pf-arrow pf-arrow-left" onClick={prev}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Cards track */}
          <div className="pf-track" ref={trackRef}>
            {items.map((item, i) => (
              <div className="pf-card" key={i}>
                <div className="pf-card-img" />
                <p className="pf-card-caption">{item.caption}</p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button className="pf-arrow pf-arrow-right" onClick={next}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
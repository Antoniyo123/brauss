import { useState, useEffect, useRef } from "react"
import "../styles/Portfolio.css"

const divisions = [
  {
    id: "event",
    label: "Event Management",
    number: "01",
    tagline: "From corporate to cultural experiences, we execute with precision and creative direction.",
    closing: "Strategy-led. Experience-driven.",
    columns: [
      {
        title: "Corporate & Brand Events",
        items: [
          "Company Gathering & Outing",
          "Brand / Product Launch",
          "Webinars (Offline / Online / Hybrid)",
          "Live Stream Broadcast",
        ],
      },
      {
        title: "Experiential & Entertainment",
        items: [
          "Music Festival",
          "Booth & Exhibition",
          "K-Pop Fan Meeting",
          "Special Activation & Gala",
        ],
      },
    ],
  },
  {
    id: "agency",
    label: "Agency",
    number: "02",
    tagline: "We build brands that are culturally relevant and commercially strong.",
    closing: "We turn brands into ecosystems, not just campaigns.",
    columns: [
      {
        title: "Brand & Marketing",
        items: [
          "Brand Development",
          "Digital Campaign",
          "Digital Ads & Media Buying",
          "Social Media Management",
        ],
      },
      {
        title: "Creative & Production",
        items: [
          "Content Production",
          "Branded Merchandise",
          "Website Development",
        ],
      },
      {
        title: "Talent & Community",
        items: [
          "KOL & KOC Management",
          "Influencer Strategy",
          "Community Building",
        ],
      },
    ],
  },
  {
    id: "promoter",
    label: "Promoter",
    number: "03",
    tagline: "We create large-scale experiences that connect artists, brands, and audiences.",
    closing: "We build moments that matter.",
    columns: [
      {
        title: null,
        items: [
          "Concert & Fan Meeting Promoter",
          "International Artist Liaison",
          "Licensing & Rights Management",
          "Ticketing Strategy & Operations",
        ],
      },
      {
        title: null,
        items: [
          "Venue & Production Management",
          "Media & Publicity Coordination",
          "Sponsorship Acquisition",
          "IP Creation & Ownership",
        ],
      },
    ],
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const div = divisions[active]

  /* ── Refs for parallax targets ── */
  const sectionRef    = useRef(null)
  const watermarkRef  = useRef(null)
  const headerRef     = useRef(null)
  const gridRef       = useRef(null)
  const closingRef    = useRef(null)
  const sidebarRef    = useRef(null)
  const bgShapeRef    = useRef(null)

  /* ── Scroll + mouse parallax ── */
  useEffect(() => {
    const scrollState = { current: 0, target: 0 }
    const mouseState  = { x: 0, y: 0, cx: 0, cy: 0 }
    let rafId

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      // progress: how far section has scrolled into view (0 = top of section at viewport bottom, 1 = bottom)
      scrollState.target = Math.max(0, -rect.top)
    }

    const onMouse = (e) => {
      mouseState.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseState.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      // lerp scroll
      scrollState.current += (scrollState.target - scrollState.current) * 0.07
      const y = scrollState.current

      // lerp mouse
      mouseState.cx += (mouseState.x - mouseState.cx) * 0.05
      mouseState.cy += (mouseState.y - mouseState.cy) * 0.05
      const mx = mouseState.cx
      const my = mouseState.cy

      // Watermark — drifts fastest, also mouse-driven
      if (watermarkRef.current) {
        watermarkRef.current.style.transform =
          `translateY(${y * -0.28}px) translateX(${mx * 18}px)`
        watermarkRef.current.style.opacity =
          Math.max(0, 0.07 - y * 0.00008).toString()
      }

      // Header — mid speed scroll + subtle mouse shift
      if (headerRef.current) {
        headerRef.current.style.transform =
          `translateY(${y * -0.12}px) translate(${mx * -5}px, ${my * -3}px)`
      }

      // Grid — slowest scroll layer
      if (gridRef.current) {
        gridRef.current.style.transform =
          `translateY(${y * -0.06}px)`
      }

      // Closing — very slight
      if (closingRef.current) {
        closingRef.current.style.transform =
          `translateY(${y * -0.04}px)`
      }

      // Sidebar — counter-scroll (slight opposite direction creates depth)
      if (sidebarRef.current) {
        sidebarRef.current.style.transform =
          `translateY(${y * 0.04}px)`
      }

      // Background shape — mouse parallax only
      if (bgShapeRef.current) {
        bgShapeRef.current.style.transform =
          `translate(${mx * -22}px, ${my * -14}px) scale(1.1)`
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="services" id="services" ref={sectionRef}>

      {/* Floating background shape — mouse parallax */}
      <div className="sv-bg-shape" ref={bgShapeRef} />

      <div className="services-container">

        {/* ── Left sidebar ── */}
        <aside className="sv-sidebar" ref={sidebarRef}>
          <span className="sv-sidebar-label">Our Divisions</span>
          <nav className="sv-tabs">
            {divisions.map((d, i) => (
              <button
                key={d.id}
                className={`sv-tab ${i === active ? "sv-tab-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="sv-tab-num">{d.number}</span>
                <span className="sv-tab-name">{d.label}</span>
                <span className="sv-tab-arrow">→</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Right content panel ── */}
        <div className="sv-content">

          {/* Watermark — deepest parallax layer */}
          <span className="sv-watermark" ref={watermarkRef} aria-hidden="true">
            {div.number}
          </span>

          {/* Header */}
          <div className="sv-header" ref={headerRef}>
            <div className="sv-header-left">
              <span className="sv-eyebrow">Division {div.number}</span>
              <h2 className="sv-title">{div.label}</h2>
            </div>
            <p className="sv-tagline">{div.tagline}</p>
          </div>

          {/* Service columns */}
          <div className={`sv-grid sv-cols-${div.columns.length}`} key={active} ref={gridRef}>
            {div.columns.map((col, i) => (
              <div className="sv-col" key={i}>
                <div className="sv-col-header">
                  <span className="sv-col-index">0{i + 1}</span>
                  {col.title && <h4 className="sv-col-title">{col.title}</h4>}
                </div>
                <ul className="sv-list">
                  {col.items.map((item, j) => (
                    <li key={j} className="sv-item">
                      <span className="sv-bullet" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div className="sv-closing-wrap" ref={closingRef}>
            <span className="sv-closing-line" />
            <p className="sv-closing">{div.closing}</p>
            <span className="sv-closing-line" />
          </div>

        </div>
      </div>
    </section>
  )
}
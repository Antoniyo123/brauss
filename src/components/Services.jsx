import { useState, useEffect, useRef } from "react"
import "../styles/Services.css"

const items = [
  {
    id: 1,
    caption: "Brand Identity Design",
    thumbnail: "https://picsum.photos/seed/brand1/800/600",
    category: "Branding",
    year: "2024",
    client: "Luminary Studio",
    duration: "3 Months",
    role: "Lead Designer",
    status: "Completed",
    description:
      "A comprehensive brand identity system crafted for a creative studio. The project encompassed logo design, color palette development, typography selection, and full brand guidelines.",
    tools: ["Figma", "Illustrator", "Photoshop"],
    images: [
      "https://picsum.photos/seed/brand1a/800/560",
      "https://picsum.photos/seed/brand1b/800/560",
      "https://picsum.photos/seed/brand1c/800/560",
    ],
  },
  {
    id: 2,
    caption: "E-Commerce UX Redesign",
    thumbnail: "https://picsum.photos/seed/ecom2/800/600",
    category: "UI/UX",
    year: "2024",
    client: "Velvet Shop",
    duration: "5 Months",
    role: "UX Lead",
    status: "Completed",
    description:
      "End-to-end redesign of an e-commerce platform focusing on conversion optimization and intuitive user flows. Led to a 38% increase in checkout completion rate post-launch.",
    tools: ["Figma", "Maze", "Hotjar"],
    images: [
      "https://picsum.photos/seed/ecom2a/800/560",
      "https://picsum.photos/seed/ecom2b/800/560",
      "https://picsum.photos/seed/ecom2c/800/560",
    ],
  },
  {
    id: 3,
    caption: "Mobile App Interface",
    thumbnail: "https://picsum.photos/seed/mobile3/800/600",
    category: "Mobile Design",
    year: "2023",
    client: "Nordin Health",
    duration: "4 Months",
    role: "UI Designer",
    status: "Completed",
    description:
      "Designed a health-tracking mobile application with a focus on accessibility and calm, motivating aesthetics. Supports both iOS and Android with dark mode and micro-animations.",
    tools: ["Figma", "Principle", "Zeplin"],
    images: [
      "https://picsum.photos/seed/mobile3a/800/560",
      "https://picsum.photos/seed/mobile3b/800/560",
      "https://picsum.photos/seed/mobile3c/800/560",
    ],
  },
  {
    id: 4,
    caption: "Dashboard Analytics UI",
    thumbnail: "https://picsum.photos/seed/dash4/800/600",
    category: "Data Visualization",
    year: "2023",
    client: "Metric Labs",
    duration: "6 Months",
    role: "Product Designer",
    status: "Completed",
    description:
      "An advanced analytics dashboard for a SaaS platform — interactive charts, filterable data tables, and a real-time notification system for complex data at a glance.",
    tools: ["Figma", "D3.js", "Storybook"],
    images: [
      "https://picsum.photos/seed/dash4a/800/560",
      "https://picsum.photos/seed/dash4b/800/560",
      "https://picsum.photos/seed/dash4c/800/560",
    ],
  },
  {
    id: 5,
    caption: "Landing Page Campaign",
    thumbnail: "https://picsum.photos/seed/land5/800/600",
    category: "Web Design",
    year: "2024",
    client: "Aura Collective",
    duration: "6 Weeks",
    role: "Visual Designer",
    status: "Live",
    description:
      "A high-impact marketing landing page with scroll-driven animations and a dynamic hero section. Resulted in a 5.2% conversion rate — well above industry average.",
    tools: ["Figma", "Webflow", "GSAP"],
    images: [
      "https://picsum.photos/seed/land5a/800/560",
      "https://picsum.photos/seed/land5b/800/560",
      "https://picsum.photos/seed/land5c/800/560",
    ],
  },
  {
    id: 6,
    caption: "Visual Identity System",
    thumbnail: "https://picsum.photos/seed/vis6/800/600",
    category: "Branding",
    year: "2023",
    client: "Cobalt Events",
    duration: "2 Months",
    role: "Brand Designer",
    status: "Completed",
    description:
      "A vibrant visual identity for an events company, built around a modular graphic language that adapts across print, digital, and environmental applications.",
    tools: ["Illustrator", "InDesign", "Figma"],
    images: [
      "https://picsum.photos/seed/vis6a/800/560",
      "https://picsum.photos/seed/vis6b/800/560",
      "https://picsum.photos/seed/vis6c/800/560",
    ],
  },
]

/* ── Modal Image Carousel ── */
function ModalCarousel({ images, title }) {
  const [current, setCurrent] = useState(0)
  const [animDir, setAnimDir] = useState(null)

  const go = (dir, e) => {
    e && e.stopPropagation()
    setAnimDir(dir)
    setTimeout(() => {
      setCurrent((c) =>
        dir === "prev"
          ? c === 0 ? images.length - 1 : c - 1
          : c === images.length - 1 ? 0 : c + 1
      )
      setAnimDir(null)
    }, 200)
  }

  return (
    <div className="mc-wrap">
      <div className="mc-main">
        <img
          src={images[current]}
          alt={`${title} — view ${current + 1}`}
          className={`mc-img ${animDir ? `mc-img-exit-${animDir}` : "mc-img-enter"}`}
        />
        <button className="mc-btn mc-btn-left" onClick={(e) => go("prev", e)}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="mc-btn mc-btn-right" onClick={(e) => go("next", e)}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="mc-dots">
          {images.map((_, i) => (
            <button key={i} className={`mc-dot ${i === current ? "mc-dot-active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }} />
          ))}
        </div>
      </div>
      <div className="mc-thumbs">
        {images.map((img, i) => (
          <button key={i} className={`mc-thumb ${i === current ? "mc-thumb-active" : ""}`}
            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}>
            <img src={img} alt={`thumb-${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Main Component ── */
export default function Services() {
  const [modal, setModal]       = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  // Parallax refs
  const sectionRef  = useRef(null)
  const eyebrowRef  = useRef(null)
  const titleRef    = useRef(null)
  const gridRef     = useRef(null)
  const orb1Ref     = useRef(null)
  const orb2Ref     = useRef(null)
  // Per-cell refs for inner image mouse parallax
  const cellRefs    = useRef({})

  useEffect(() => {
    const scroll = { current: 0, target: 0 }
    const mouse  = { x: 0, y: 0, cx: 0, cy: 0 }
    let rafId

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      scroll.target = Math.max(0, -el.getBoundingClientRect().top)
    }
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      scroll.current += (scroll.target - scroll.current) * 0.07
      mouse.cx += (mouse.x - mouse.cx) * 0.055
      mouse.cy += (mouse.y - mouse.cy) * 0.055

      const y = scroll.current, mx = mouse.cx, my = mouse.cy

      // ── Header layers ──
      if (eyebrowRef.current)
        eyebrowRef.current.style.transform = `translateY(${y * -0.20}px) translate(${mx * -7}px, ${my * -3}px)`

      if (titleRef.current)
        titleRef.current.style.transform   = `translateY(${y * -0.15}px) translate(${mx * -5}px, ${my * -4}px)`

      // ── Grid — subtle lift ──
      if (gridRef.current)
        gridRef.current.style.transform    = `translateY(${y * -0.05}px)`

      // ── Background orbs — counter-mouse ──
      if (orb1Ref.current)
        orb1Ref.current.style.transform    = `translate(${mx * 22}px, ${y * 0.08 + my * 14}px)`
      if (orb2Ref.current)
        orb2Ref.current.style.transform    = `translate(${mx * -16}px, ${y * -0.06 + my * -10}px)`
    }

    window.addEventListener("scroll",    onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse,  { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const openModal = (item) => {
    setModal(item)
    requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)))
  }
  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => setModal(null), 380)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [modal])

  return (
    <section className="portfolio" id="portfolio" ref={sectionRef}>

      {/* ── Parallax background orbs ── */}
      <div className="pf-orb pf-orb-1" ref={orb1Ref} aria-hidden="true" />
      <div className="pf-orb pf-orb-2" ref={orb2Ref} aria-hidden="true" />

      {/* ── Header ── */}
      <div className="portfolio-header">
        <span className="portfolio-eyebrow" ref={eyebrowRef}>Selected Work</span>
        <h2 className="portfolio-title" ref={titleRef}>Portfolio</h2>
      </div>

      {/* ── 3-col Grid ── */}
      <div className="pf-grid" ref={gridRef}>
        {items.map((item) => (
          <div
            key={item.id}
            className={`pf-cell ${hoveredId && hoveredId !== item.id ? "pf-cell-dimmed" : ""}`}
            ref={el => cellRefs.current[item.id] = el}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={(e) => {
              setHoveredId(null)
              // Reset CSS vars
              const el = cellRefs.current[item.id]
              if (el) { el.style.setProperty("--px", "0px"); el.style.setProperty("--py", "0px") }
            }}
            onMouseMove={(e) => {
              const el = cellRefs.current[item.id]
              if (!el) return
              const rect = el.getBoundingClientRect()
              const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2  // -1 to 1
              const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
              el.style.setProperty("--px", `${nx * -8}px`)
              el.style.setProperty("--py", `${ny * -6}px`)
            }}
            onClick={() => openModal(item)}
          >
            <img
              className="pf-cell-img"
              src={item.thumbnail}
              alt={item.caption}
            />
            <div className="pf-cell-base-overlay" />

            <div className="pf-cell-top">
              <span className="pf-cell-category">{item.category}</span>
              <h3 className="pf-cell-title">{item.caption}</h3>
            </div>

            <div className="pf-cell-bottom">
              <button className="pf-view-case">
                View Case
                <svg viewBox="0 0 24 24" fill="none" width="11" height="11">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {item.status === "Live" && (
              <div className="pf-cell-live">
                <span className="pf-live-dot" /> Live
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ══ MODAL ══ */}
      {modal && (
        <div
          className={`pf-modal-backdrop ${isVisible ? "pf-modal-backdrop--in" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`pf-modal ${isVisible ? "pf-modal--in" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="pf-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className={`pf-modal-left ${isVisible ? "pf-modal-left--in" : ""}`}>
              <ModalCarousel images={modal.images} title={modal.caption} />
            </div>

            <div className="pf-modal-right">

              <div className={`pf-modal-meta ${isVisible ? "pf-stagger-1" : ""}`}>
                <span className="pf-meta-cat">{modal.category}</span>
                {modal.status === "Live"
                  ? <span className="pf-meta-live"><span className="pf-live-dot" />Live</span>
                  : <span className="pf-meta-done">Completed</span>
                }
                <span className="pf-meta-year">{modal.year}</span>
              </div>

              <h3 className={`pf-modal-title ${isVisible ? "pf-stagger-2" : ""}`}>
                {modal.caption}
              </h3>

              <div className={`pf-accent-line ${isVisible ? "pf-stagger-2" : ""}`} />

              <div className={`pf-info-row ${isVisible ? "pf-stagger-3" : ""}`}>
                {[
                  { label: "Client",   value: modal.client },
                  { label: "Duration", value: modal.duration },
                  { label: "Role",     value: modal.role },
                ].map(({ label, value }) => (
                  <div className="pf-info-pill" key={label}>
                    <span className="pf-info-label">{label}</span>
                    <span className="pf-info-value">{value}</span>
                  </div>
                ))}
              </div>

              <p className={`pf-modal-desc ${isVisible ? "pf-stagger-4" : ""}`}>
                {modal.description}
              </p>

              <div className={`pf-tools-section ${isVisible ? "pf-stagger-5" : ""}`}>
                <span className="pf-tools-label">Tools Used</span>
                <div className="pf-tools">
                  {modal.tools.map((tool, i) => (
                    <span key={i} className="pf-tool">{tool}</span>
                  ))}
                </div>
              </div>

              <button className={`pf-modal-cta ${isVisible ? "pf-stagger-6" : ""}`}>
                View Full Case Study
                <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
import { useState, useEffect } from "react"
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
    tags: ["Logo", "Typography", "Guidelines"],
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
    tags: ["Wireframe", "Prototype", "Research"],
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
    tags: ["iOS", "Android", "Design System"],
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
    tags: ["SaaS", "Charts", "Real-time"],
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
    tags: ["Animation", "CRO", "Marketing"],
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
    tags: ["Print", "Digital", "Brand Book"],
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
    }, 180)
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
        <span className="mc-counter">{current + 1} / {images.length}</span>
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
  const [modal, setModal] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setModal(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [modal])

  return (
    <section className="portfolio" id="portfolio">

      {/* ── Header ── */}
      <div className="portfolio-inner">
        <div className="portfolio-header">
          <span className="portfolio-eyebrow">Selected Work</span>
          <h2 className="portfolio-title">Portfolio</h2>
        </div>

      {/* ── Full-bleed Grid ── */}
      <div className="pf-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={`pf-cell ${hoveredId && hoveredId !== item.id ? "pf-cell-dimmed" : ""}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setModal(item)}
          >
            {/* Background image */}
            <img className="pf-cell-img" src={item.thumbnail} alt={item.caption} />

            {/* Dark overlay base */}
            <div className="pf-cell-base-overlay" />

            {/* Top-left label (always visible) */}
            <div className="pf-cell-top">
              <span className="pf-cell-category">{item.category}</span>
              <h3 className="pf-cell-title">{item.caption}</h3>
            </div>

            {/* Bottom hover reveal */}
            <div className="pf-cell-bottom">
              <p className="pf-cell-desc">{item.description}</p>
              <button className="pf-view-case">
                VIEW CASE
                <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Status badge */}
            {item.status === "Live" && (
              <div className="pf-cell-live">
                <span className="pf-live-dot" /> Live
              </div>
            )}
          </div>
        ))}
      </div>
      </div>{/* /portfolio-inner */}

      {/* ══ MODAL ══ */}
      {modal && (
        <div className="pf-modal-backdrop" onClick={() => setModal(null)}>
          <div className="pf-modal" onClick={(e) => e.stopPropagation()}>

            <button className="pf-modal-close" onClick={() => setModal(null)}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="pf-modal-left">
              <ModalCarousel images={modal.images} title={modal.caption} />
            </div>

            <div className="pf-modal-right">
              <div className="pf-modal-header">
                <div className="pf-modal-badges">
                  <span className="pf-badge pf-badge-cat">{modal.category}</span>
                  <span className={`pf-badge ${modal.status === "Live" ? "pf-badge-live" : "pf-badge-done"}`}>
                    {modal.status === "Live" && <span className="pf-live-dot" />}
                    {modal.status}
                  </span>
                </div>
                <h3 className="pf-modal-title">{modal.caption}</h3>
              </div>

              <div className="pf-info-grid">
                {[
                  { label: "Client",   value: modal.client },
                  { label: "Year",     value: modal.year },
                  { label: "Duration", value: modal.duration },
                  { label: "Role",     value: modal.role },
                ].map(({ label, value }) => (
                  <div className="pf-info-item" key={label}>
                    <span className="pf-info-label">{label}</span>
                    <span className="pf-info-value">{value}</span>
                  </div>
                ))}
              </div>

              <div className="pf-divider" />

              <div className="pf-modal-section">
                <h4 className="pf-section-title"><span className="pf-section-line" />About the Project</h4>
                <p className="pf-modal-desc">{modal.description}</p>
              </div>

              <div className="pf-divider" />

              <div className="pf-modal-section">
                <h4 className="pf-section-title"><span className="pf-section-line" />Tools Used</h4>
                <div className="pf-tools">
                  {modal.tools.map((tool, i) => <span key={i} className="pf-tool">{tool}</span>)}
                </div>
              </div>

              <div className="pf-modal-tags">
                {modal.tags.map((tag, i) => <span key={i} className="pf-modal-tag">#{tag}</span>)}
              </div>

              <button className="pf-modal-cta">
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
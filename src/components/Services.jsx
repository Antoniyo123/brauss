import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Portfolio.css"

// Division structure tetap di sini, tapi label & konten diambil dari t()
const DIVISION_KEYS = [
  {
    id:      "event",
    number:  "01",
    labelKey:   "div1Label",
    taglineKey: "div1Tagline",
    closingKey: "div1Closing",
    columns: [
      { titleKey: "div1Col1Title", itemsKey: "div1Col1Items" },
      { titleKey: "div1Col2Title", itemsKey: "div1Col2Items" },
    ],
  },
  {
    id:      "agency",
    number:  "02",
    labelKey:   "div2Label",
    taglineKey: "div2Tagline",
    closingKey: "div2Closing",
    columns: [
      { titleKey: "div2Col1Title", itemsKey: "div2Col1Items" },
      { titleKey: "div2Col2Title", itemsKey: "div2Col2Items" },
      { titleKey: "div2Col3Title", itemsKey: "div2Col3Items" },
    ],
  },
  {
    id:      "promoter",
    number:  "03",
    labelKey:   "div3Label",
    taglineKey: "div3Tagline",
    closingKey: "div3Closing",
    columns: [
      { titleKey: null, itemsKey: "div3Col1Items" },
      { titleKey: null, itemsKey: "div3Col2Items" },
    ],
  },
]

export default function Services() {
  const { t, tArr } = useLanguage()
  const [active, setActive] = useState(0)
  const div = DIVISION_KEYS[active]

  const sectionRef   = useRef(null)
  const watermarkRef = useRef(null)
  const headerRef    = useRef(null)
  const gridRef      = useRef(null)
  const closingRef   = useRef(null)
  const sidebarRef   = useRef(null)
  const bgShapeRef   = useRef(null)
  

  useEffect(() => {
    const scrollState = { current: 0, target: 0 }
    const mouseState  = { x: 0, y: 0, cx: 0, cy: 0 }
    let rafId

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      scrollState.target = Math.max(0, -section.getBoundingClientRect().top)
    }
    const onMouse = (e) => {
      mouseState.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseState.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      scrollState.current += (scrollState.target - scrollState.current) * 0.07
      const y = scrollState.current
      mouseState.cx += (mouseState.x - mouseState.cx) * 0.05
      mouseState.cy += (mouseState.y - mouseState.cy) * 0.05
      const mx = mouseState.cx, my = mouseState.cy

      if (watermarkRef.current) {
        watermarkRef.current.style.transform = `translateY(${y * -0.28}px) translateX(${mx * 18}px)`
        watermarkRef.current.style.opacity   = Math.max(0, 0.07 - y * 0.00008).toString()
      }
      if (headerRef.current)
        headerRef.current.style.transform  = `translateY(${y * -0.12}px) translate(${mx * -5}px, ${my * -3}px)`
      if (gridRef.current)
        gridRef.current.style.transform    = `translateY(${y * -0.06}px)`
      if (closingRef.current)
        closingRef.current.style.transform = `translateY(${y * -0.04}px)`
      if (sidebarRef.current)
        sidebarRef.current.style.transform = `translateY(${y * 0.04}px)`
      if (bgShapeRef.current)
        bgShapeRef.current.style.transform = `translate(${mx * -22}px, ${my * -14}px) scale(1.1)`
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

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="sv-bg-shape" ref={bgShapeRef} />

      <div className="services-container">

        {/* ── Sidebar ── */}
        <aside className="sv-sidebar" ref={sidebarRef}>
          <span className="sv-sidebar-label">{t("servicesSideLabel")}</span>
          <nav className="sv-tabs">
            {DIVISION_KEYS.map((d, i) => (
              <button
                key={d.id}
                className={`sv-tab ${i === active ? "sv-tab-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="sv-tab-num">{d.number}</span>
                <span className="sv-tab-name">{t(d.labelKey)}</span>
                <span className="sv-tab-arrow">→</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Content panel ── */}
        <div className="sv-content">
          <span className="sv-watermark" ref={watermarkRef} aria-hidden="true">
            {div.number}
          </span>

          <div className="sv-header" ref={headerRef}>
            <div className="sv-header-left">
              <span className="sv-eyebrow">{t("servicesEyebrow")} {div.number}</span>
              <h2 className="sv-title">{t(div.labelKey)}</h2>
            </div>
            <p className="sv-tagline">{t(div.taglineKey)}</p>
          </div>

          <div className={`sv-grid sv-cols-${div.columns.length}`} key={`${active}-${t("services")}`} ref={gridRef}>
            {div.columns.map((col, i) => (
              <div className="sv-col" key={i}>
                <div className="sv-col-header">
                  <span className="sv-col-index">0{i + 1}</span>
                  {col.titleKey && <h4 className="sv-col-title">{t(col.titleKey)}</h4>}
                </div>
                <ul className="sv-list">
                  {tArr(col.itemsKey).map((item, j) => (
                    <li key={j} className="sv-item">
                      <span className="sv-bullet" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="sv-closing-wrap" ref={closingRef}>
            <span className="sv-closing-line" />
            <p className="sv-closing">{t(div.closingKey)}</p>
            <span className="sv-closing-line" />
          </div>
        </div>

      </div>
    </section>
  )
}
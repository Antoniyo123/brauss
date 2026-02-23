import { useState } from "react"
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

  return (
    <section className="services" id="services">
      <div className="services-container">

        {/* ── Left sidebar: vertical tabs ── */}
        <aside className="sv-sidebar">
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

        {/* ── Right: content panel ── */}
        <div className="sv-content">

          {/* Big number watermark */}
          <span className="sv-watermark" aria-hidden="true">{div.number}</span>

          {/* Header */}
          <div className="sv-header">
            <div className="sv-header-left">
              <span className="sv-eyebrow">Division {div.number}</span>
              <h2 className="sv-title">{div.label}</h2>
            </div>
            <p className="sv-tagline">{div.tagline}</p>
          </div>

          {/* Service columns */}
          <div className={`sv-grid sv-cols-${div.columns.length}`} key={active}>
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
          <div className="sv-closing-wrap">
            <span className="sv-closing-line" />
            <p className="sv-closing">{div.closing}</p>
            <span className="sv-closing-line" />
          </div>

        </div>
      </div>
    </section>
  )
}
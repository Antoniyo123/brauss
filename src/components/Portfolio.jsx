import { useState } from "react"
import "../styles/Portfolio.css"

const divisions = [
  {
    id: "event",
    label: "Event Management",
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
    <section className="services">
      <div className="services-container">

        {/* ── Tab navigation ── */}
        <nav className="sv-tabs">
          {divisions.map((d, i) => (
            <button
              key={d.id}
              className={`sv-tab ${i === active ? "sv-tab-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="sv-tab-index">0{i + 1}</span>
              {d.label}
            </button>
          ))}
          {/* sliding underline */}
          <span
            className="sv-tab-indicator"
            style={{ transform: `translateX(${active * 100}%)`, width: `calc(100% / ${divisions.length})` }}
          />
        </nav>

        {/* ── Content panel ── */}
        <div className="sv-panel" key={active}>

          {/* Header row */}
          <div className="sv-header">
            <h2 className="sv-title">{div.label}</h2>
            <p className="sv-tagline">{div.tagline}</p>
          </div>

          {/* Service columns */}
          <div className={`sv-grid sv-cols-${div.columns.length}`}>
            {div.columns.map((col, i) => (
              <div className="sv-col" key={i}>
                {col.title ? (
                  <>
                    <span className="sv-col-index">0{i + 1}</span>
                    <h4 className="sv-col-title">{col.title}</h4>
                  </>
                ) : (
                  <span className="sv-col-index">0{i + 1}</span>
                )}
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

          {/* Closing statement */}
          <p className="sv-closing">{div.closing}</p>

        </div>
      </div>
    </section>
  )
}
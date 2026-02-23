import "../styles/TrustedBy.css"

const rows = [
  [
    { name: "ASHTA District 8",  src: "/logos/ashta.png" },
    { name: "Keppel Land",       src: "/logos/keppelland.png" },
    { name: "KOMPAS",            src: "/logos/kompas.png" },
    { name: "Bank Victoria",     src: "/logos/bankvictoria.png" },
    { name: "PT Abutnim",        src: "/logos/ptabutnim.png" },
    { name: "Rheumacyl",         src: "/logos/rheumacyl.png" },
    { name: "realme",            src: "/logos/realme.png" },
  ],
  [
    { name: "OPPO",              src: "/logos/oppo.png" },
    { name: "VIVO",              src: "/logos/vivo.png" },
    { name: "Xiaomi",            src: "/logos/xiaomi.png" },
    { name: "Rumah Siapkerja",   src: "/logos/rumahsiapkerja.png" },
    { name: "OOO",               src: "/logos/ooo.png" },
    { name: "IDSMED",            src: "/logos/idsmed.png" },
    { name: "Galderma",          src: "/logos/galderma.png" },
  ],
  [
    { name: "Y.O.U",             src: "/logos/you.png" },
    { name: "Weird Genius",      src: "/logos/weirdgenius.png" },
    { name: "Muslimverse",       src: "/logos/muslimverse.png" },
    { name: "Muklay",            src: "/logos/muklay.png" },
    { name: "Pokemon GO",        src: "/logos/pokemongo.png" },
    { name: "Unison Medika",     src: "/logos/unisonmedika.png" },
    { name: "D'Jantari",         src: "/logos/djantari.png" },
  ],
  [
    { name: "3Second",           src: "/logos/3second.png" },
    { name: "La Joie",           src: "/logos/lajoie.png" },
    { name: "Le Nueve",          src: "/logos/lenueve.png" },
    { name: "Yoshinoya",         src: "/logos/yoshinoya.png" },
    { name: "Dapur Umami",       src: "/logos/dapurumami.png" },
    { name: "ASHTA District 8",  src: "/logos/ashta.png" },
    { name: "KOMPAS",            src: "/logos/kompas.png" },
  ],
]

function MarqueeRow({ logos, reverse = false }) {
  // Duplicate for seamless loop
  const doubled = [...logos, ...logos]
  return (
    <div className={`tb-marquee-track ${reverse ? "tb-reverse" : ""}`}>
      <div className="tb-marquee-inner">
        {doubled.map((logo, i) => (
          <div className="tb-logo" key={i}>
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TrustedBy() {
  return (
    <section className="trusted">

      {/* ── Floating spheres ── */}
      <div className="trusted-spheres" aria-hidden="true">
        <div className="ts ts-1" />
        <div className="ts ts-2" />
        <div className="ts ts-3" />
        <div className="ts ts-4" />
      </div>

      {/* ── Top divider line ── */}
      <div className="trusted-divider-top" />

      <div className="trusted-layout">

        {/* ── LEFT — sticky label ── */}
        <div className="trusted-left">
          <div className="trusted-left-inner">
            <span className="trusted-eyebrow">Our Clients</span>
            <h2 className="trusted-heading">
              Trusted<br />by the<br />best.
            </h2>
            <div className="trusted-stat">
              <span className="trusted-stat-num">26+</span>
              <span className="trusted-stat-label">brands & partners<br />across industries</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT — marquee rows ── */}
        <div className="trusted-right">
          {rows.map((row, i) => (
            <MarqueeRow key={i} logos={row} reverse={i % 2 !== 0} />
          ))}
        </div>

      </div>

      {/* ── Bottom divider line ── */}
      <div className="trusted-divider-bottom" />

    </section>
  )
}
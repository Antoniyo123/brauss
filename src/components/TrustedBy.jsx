import "../styles/TrustedBy.css"

// Grouped by rows exactly as in screenshot
const rows = [
  [
    { name: "ASHTA District 8",  src: "/logos/ashta.png" },
    { name: "Keppel Land",       src: "/logos/keppelland.png" },
    { name: "KOMPAS",            src: "/logos/kompas.png" },
    { name: "Bank Victoria",     src: "/logos/bankvictoria.png" },
    { name: "PT Abutnim",        src: "/logos/ptabutnim.png" },
  ],
  [
    { name: "Rheumacyl",         src: "/logos/rheumacyl.png" },
    { name: "realme",            src: "/logos/realme.png" },
    { name: "OPPO",              src: "/logos/oppo.png" },
    { name: "VIVO",              src: "/logos/vivo.png" },
    { name: "Xiaomi",            src: "/logos/xiaomi.png" },
  ],
  [
    { name: "Rumah Siapkerja",   src: "/logos/rumahsiapkerja.png" },
    { name: "OOO",               src: "/logos/ooo.png" },
    { name: "IDSMED",            src: "/logos/idsmed.png" },
    { name: "Galderma",          src: "/logos/galderma.png" },
    { name: "Y.O.U",             src: "/logos/you.png" },
    { name: "Weird Genius",      src: "/logos/weirdgenius.png" },
  ],
  [
    { name: "Muslimverse",       src: "/logos/muslimverse.png" },
    { name: "Muklay",            src: "/logos/muklay.png" },
    { name: "Pokemon GO",        src: "/logos/pokemongo.png" },
    { name: "Unison Medika",     src: "/logos/unisonmedika.png" },
    { name: "D'Jantari",         src: "/logos/djantari.png" },
    { name: "3Second",           src: "/logos/3second.png" },
  ],
  [
    { name: "La Joie",           src: "/logos/lajoie.png" },
    { name: "Le Nueve",          src: "/logos/lenueve.png" },
    { name: "Yoshinoya",         src: "/logos/yoshinoya.png" },
    { name: "Dapur Umami",       src: "/logos/dapurumami.png" },
  ],
]

export default function TrustedBy() {
  return (
    <section className="trusted">
      {/* Spheres decoration bottom-left */}
      <div className="trusted-spheres">
        <div className="ts ts-1" />
        <div className="ts ts-2" />
        <div className="ts ts-3" />
      </div>

      <h2 className="trusted-title">Who Trusted Us</h2>

      <div className="trusted-rows">
        {rows.map((row, ri) => (
          <div className="trusted-row" key={ri}>
            {row.map((logo, li) => (
              <div className="trusted-logo" key={li}>
                <img src={logo.src} alt={logo.name} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
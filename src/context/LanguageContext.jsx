import { createContext, useContext, useState, useCallback } from "react"

export const translations = {
  en: {
    // ── Navbar ──────────────────────────────────────────────
    home:      "Home",
    about:     "About",
    portfolio: "Portfolio",
    services:  "Services",
    contact:   "Contact Us",

    // ── Hero ─────────────────────────────────────────────────
    heroHeadLine1:  "who",
    heroHeadLine2:  "we are",
    heroDesc:       "A creative house within the creative industry, developing original ideas, brand experiences and intellectual properties with long‑term value.",
    heroStat1Num: "360\u00B0",
    heroStat1Label: "Creative Expertise",
    heroStat2Num:   "100+",
    heroStat2Label: "Projects",
    heroStat3Num:   "Since 2022",
    heroStat3Label: "creating experiences",
    heroTagline:    "From ideas to owned impact.\nWe build creative assets\nand experiences that live\nbeyond a single project.",

    // ── Services ─────────────────────────────────────────────
    servicesSideLabel: "Our Services",
    servicesEyebrow:   "Services",

    div1Label:     "Event Management",
    div1Tagline:   "From corporate to cultural experiences, we execute with precision and creative direction.",
    div1Closing:   "Strategy-led. Experience-driven.",
    div1Col1Title: "Corporate & Brand Events",
    div1Col1Items: ["Company Gathering & Outing","Brand / Product Launch","Webinars (Offline / Online / Hybrid)","Live Stream Broadcast"],
    div1Col2Title: "Experiential & Entertainment",
    div1Col2Items: ["Music Festival","Booth & Exhibition","K-Pop Fan Meeting","Special Activation & Gala"],

    div2Label:     "Agency",
    div2Tagline:   "We build brands that are culturally relevant and commercially strong.",
    div2Closing:   "We turn brands into ecosystems, not just campaigns.",
    div2Col1Title: "Brand & Marketing",
    div2Col1Items: ["Brand Development","Digital Campaign","Digital Ads & Media Buying","Social Media Management"],
    div2Col2Title: "Creative & Production",
    div2Col2Items: ["Content Production","Branded Merchandise","Website Development"],
    div2Col3Title: "Talent & Community",
    div2Col3Items: ["KOL & KOC Management","Influencer Strategy","Community Building"],

    div3Label:     "Promoter",
    div3Tagline:   "We create large-scale experiences that connect artists, brands, and audiences.",
    div3Closing:   "We build moments that matter.",
    div3Col1Items: ["Concert & Fan Meeting Promoter","International Artist Liaison","Licensing & Rights Management","Ticketing Strategy & Operations"],
    div3Col2Items: ["Venue & Production Management","Media & Publicity Coordination","Sponsorship Acquisition","IP Creation & Ownership"],

    // ── TrustedBy ────────────────────────────────────────────
    trustedEyebrow:  "Our Clients",
    trustedHeading:  "Trusted\nby the\nbest.",
    trustedStatNum:  "75+",
    trustedStatLabel:"brands & partners\nacross industries",

    // ── Contact ──────────────────────────────────────────────
    contactEyebrow:    "Get in Touch",
    contactTitle:      "Contact\nUs.",
    contactSubtitle:   "Lets build something that lasts.\nTell us about your idea, and we'll\ntake it from there.",
    contactLabelName:  "Full Name",
    contactPlaceName:  "Your name",
    contactLabelPhone: "Phone Number",
    contactPlacePhone: "+62",
    contactLabelEmail: "Email",
    contactPlaceEmail: "your@email.com",
    contactLabelMsg:   "Message",
    contactPlaceMsg:   "Tell us about your project...",
    contactSend:       "Send Message",

    // ── Footer ───────────────────────────────────────────────
    footerCtaEyebrow:   "Ready to start?",
    footerCtaHeading:   "Lets build\nsomething\ngreat.",
    footerCtaSub:       "Have a project in mind? Let's talk.\nWe'd love to hear from you.",
    footerCtaBtn:       "Start a Conversation",
    footerDesc:         "A creative house developing original ideas, brand experiences and intellectual properties with long‑term value.",
    footerNavLabel:     "Navigate",
    footerNavItems:     ["Home","About","Services","Contact Us"],
    footerContactLabel: "Contact",
    footerAddress:      "18 Office Park, 10th A Floor\nJl. TB Simatupang No. 18\nJakarta Selatan 12520",
    footerRights:       "© 2022 Brauss Group. All rights reserved.",
    footerEntity:       "PT Bumintara Dira Mandaya",
  },

  id: {
    // ── Navbar ──────────────────────────────────────────────
    home:      "Beranda",
    about:     "Tentang",
    portfolio: "Portofolio",
    services:  "Layanan",
    contact:   "Hubungi Kami",

    // ── Hero ─────────────────────────────────────────────────
    heroHeadLine1:  "siapa",
    heroHeadLine2:  "kami",
    heroDesc:       "Sebuah creative house yang bergerak di industri kreatif, menghadirkan ide-ide orisinal, pengalaman brand, dan properti intelektual yang dibangun untuk nilai jangka panjang.",
    heroStat1Num:   "360",
    heroStat1Label: "Keahlian Kreatif",
    heroStat2Num:   "100+",
    heroStat2Label: "Proyek",
    heroStat3Num:   "Sejak 2022",
    heroStat3Label: "menciptakan pengalaman",
    heroTagline:    "Dari ide menuju dampak nyata.\nKami membangun aset kreatif\ndan pengalaman yang hidup\nmelampaui satu proyek.",

    // ── Services ─────────────────────────────────────────────
    servicesSideLabel: "Layanan Kami",
    servicesEyebrow:   "Layanan",

    div1Label:     "Event Management",
    div1Tagline:   "Mulai dari proyek korporat hingga pengalaman kultural, kami mengeksekusi setiap detail dengan presisi dan visi kreatif yang jelas.",
    div1Closing:   "Berbasis strategi. Didorong pengalaman.",
    div1Col1Title: "Event Korporat & Brand",
    div1Col1Items: ["Company Gathering & Outing","Peluncuran Brand / Produk","Webinar (Offline / Online / Hybrid)","Live Stream Broadcast"],
    div1Col2Title: "Experiential & Hiburan",
    div1Col2Items: ["Festival Musik","Booth & Pameran","K-Pop Fan Meeting","Aktivasi Khusus & Gala"],

    div2Label:     "Agensi",
    div2Tagline:   "Kami membangun brand yang relevan secara budaya dan kuat secara komersial.",
    div2Closing:   "Kami mengubah brand menjadi ekosistem, bukan sekadar kampanye.",
    div2Col1Title: "Brand & Pemasaran",
    div2Col1Items: ["Pengembangan Brand","Kampanye Digital","Iklan Digital & Media Buying","Manajemen Media Sosial"],
    div2Col2Title: "Kreatif & Produksi",
    div2Col2Items: ["Produksi Konten","Merchandise Branded","Pengembangan Website"],
    div2Col3Title: "Talent & Komunitas",
    div2Col3Items: ["Manajemen KOL & KOC","Strategi Influencer","Pembangunan Komunitas"],

    div3Label:     "Promotor",
    div3Tagline:   "Kami menciptakan pengalaman berskala besar yang menghubungkan artis, brand, dan audiens.",
    div3Closing:   "Kami membangun momen yang bermakna.",
    div3Col1Items: ["Promotor Konser & Fan Meeting","Penghubung Artis Internasional","Manajemen Lisensi & Hak","Strategi & Operasional Tiket"],
    div3Col2Items: ["Manajemen Venue & Produksi","Koordinasi Media & Publisitas","Akuisisi Sponsor","Penciptaan & Kepemilikan IP"],

    // ── TrustedBy ────────────────────────────────────────────
    trustedEyebrow:  "Klien Kami",
    trustedHeading:  "Dipercaya\noleh yang\nterbaik.",
    trustedStatNum:  "75+",
    trustedStatLabel:"brand & mitra\ndi berbagai industri",

    // ── Contact ──────────────────────────────────────────────
    contactEyebrow:    "Terhubung dengan Kami",
    contactTitle:      "Kontak\nKami.",
    contactSubtitle:   "Mari wujudkan sesuatu yang bernilai jangka panjang.\nCeritakan ide Anda, dan kami\nakan mengembangkannya lebih jauh.",
    contactLabelName:  "Nama Lengkap",
    contactPlaceName:  "Nama Anda",
    contactLabelPhone: "Nomor Telepon",
    contactPlacePhone: "+62",
    contactLabelEmail: "Email",
    contactPlaceEmail: "email@anda.com",
    contactLabelMsg:   "Pesan",
    contactPlaceMsg:   "Ceritakan tentang proyek Anda...",
    contactSend:       "Kirim Pesan",

    // ── Footer ───────────────────────────────────────────────
    footerCtaEyebrow:   "Siap memulai?",
    footerCtaHeading:   "Mari bangun\nsesuatu\nyang hebat.",
    footerCtaSub:       "Punya ide proyek? Yuk ngobrol.\nKami ingin mendengar cerita Anda.",
    footerCtaBtn:       "Mulai Percakapan",
    footerDesc:         "Rumah kreatif yang mengembangkan ide orisinal, pengalaman brand, dan kekayaan intelektual bernilai jangka panjang.",
    footerNavLabel:     "Navigasi",
    footerNavItems:     ["Beranda","Tentang","Layanan","Hubungi Kami"],
    footerContactLabel: "Kontak",
    footerAddress:      "18 Office Park, Lantai 10A\nJl. TB Simatupang No. 18\nJakarta Selatan 12520",
    footerRights:       "© 2022 Brauss Group. Semua hak dilindungi.",
    footerEntity:       "PT Bumintara Dira Mandaya",
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() =>
    localStorage.getItem("brauss-lang") || "en"
  )

  const toggleLanguage = useCallback(() => {
    setLangState(prev => {
      const next = prev === "en" ? "id" : "en"
      localStorage.setItem("brauss-lang", next)
      return next
    })
  }, [])

  const setLanguage = useCallback((code) => {
    if (code !== "en" && code !== "id") return
    setLangState(code)
    localStorage.setItem("brauss-lang", code)
  }, [])

  /** t("key") → string. Supports \n as literal line break hint */
  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations["en"]?.[key] ?? key,
    [lang]
  )

  /** tArr("key") → string[] dari value yang berupa array */
  const tArr = useCallback(
    (key) => {
      const val = translations[lang]?.[key] ?? translations["en"]?.[key] ?? []
      return Array.isArray(val) ? val : [val]
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, t, tArr, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>")
  return ctx
}

export default LanguageContext
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Contact.css"

const socials = [
  {
    label: "Instagram",
    url:   "https://www.instagram.com/braussnetworks",
    path:  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
{
  label: "LinkedIn",
  url:   "https://www.linkedin.com/company/brauss",
  path:  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
},
  
  // {
  //   label: "Facebook",
  //   url:   "https://www.facebook.com/braussnetworks",
  //   path:  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  // },
]

// ─── Format tanggal & waktu Indonesia ───────────────────────────────────────
const getTimestamp = () => {
  const now = new Date()
  return now.toLocaleString("id-ID", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
    hour:    "2-digit",
    minute:  "2-digit",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  })
}

// ─── Buat body pesan terstruktur (plain-text) ────────────────────────────────
const buildMessageBody = ({ name, phone, email, message }) => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BRAUSS NETWORKS — NEW INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DETAIL PENGIRIM
──────────────────
👤 Nama     : ${name}
📞 Telepon  : ${phone}
📧 Email    : ${email}

💬 PESAN
──────────────────
${message}

──────────────────
🕐 Diterima : ${getTimestamp()}
🌐 Sumber   : braussnetworks.com — Contact Form

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Balas langsung ke email pengirim:
${email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim()

export default function Contact() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting]   = useState(false)
  const [submitStatus, setSubmitStatus]   = useState(null)

  const sectionRef  = useRef(null)
  const eyebrowRef  = useRef(null)
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const emailRef    = useRef(null)
  const socialsRef  = useRef(null)
  const formCardRef = useRef(null)
  const cs1Ref = useRef(null), cs2Ref = useRef(null), cs3Ref = useRef(null)
  const cs4Ref = useRef(null), cs5Ref = useRef(null)
  const bgOrbRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "3bb939b9-5345-4b9f-b3ed-94b57a2c8a65",
          subject:   `[Brauss Networks] Pesan baru dari ${formData.name}`,
          from_name: "Brauss Networks — Contact Form",
          name:    formData.name,
          email:   formData.email,
          message: buildMessageBody(formData),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        setTimeout(() => {
          setFormData({ name: "", phone: "", email: "", message: "" })
          setSubmitStatus(null)
        }, 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch (err) {
      console.error("Error sending message:", err)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Parallax ──────────────────────────────────────────────────────────────
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

      if (eyebrowRef.current)
        eyebrowRef.current.style.transform  = `translateY(${y * -0.20}px) translate(${mx * -6}px, ${my * -3}px)`
      if (titleRef.current)
        titleRef.current.style.transform    = `translateY(${y * -0.16}px) translate(${mx * -5}px, ${my * -4}px)`
      if (subtitleRef.current)
        subtitleRef.current.style.transform = `translateY(${y * -0.11}px) translate(${mx * -3}px, ${my * -2}px)`
      if (emailRef.current)
        emailRef.current.style.transform    = `translateY(${y * -0.08}px) translate(${mx * -2}px, ${my * -1}px)`
      if (socialsRef.current)
        socialsRef.current.style.transform  = `translateY(${y * -0.05}px)`
      if (formCardRef.current)
        formCardRef.current.style.transform = `translateY(${y * -0.09}px) translate(${mx * 4}px, ${my * 3}px)`
      if (cs1Ref.current)
        cs1Ref.current.style.transform = `translate(-50%,-50%) translate(${mx * -14}px, ${y * -0.18 + my * -10}px)`
      if (cs2Ref.current)
        cs2Ref.current.style.transform = `translate(${mx * -22}px, ${y * -0.30 + my * -16}px)`
      if (cs3Ref.current)
        cs3Ref.current.style.transform = `translate(${mx * -10}px, ${y * -0.14 + my * -8}px)`
      if (cs4Ref.current)
        cs4Ref.current.style.transform = `translate(${mx * -26}px, ${y * -0.22 + my * -18}px)`
      if (cs5Ref.current)
        cs5Ref.current.style.transform = `translate(${mx * -8}px,  ${y * -0.10 + my * -6}px)`
      if (bgOrbRef.current)
        bgOrbRef.current.style.transform = `translate(${mx * 24}px, ${my * 16}px)`
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

  const titleLines    = t("contactTitle").split("\n")
  const subtitleLines = t("contactSubtitle").split("\n")

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-bg-orb" ref={bgOrbRef} aria-hidden="true" />

      <div className="contact-spheres" aria-hidden="true">
        <div className="cs cs-1" ref={cs1Ref} />
        <div className="cs cs-2" ref={cs2Ref} />
        <div className="cs cs-3" ref={cs3Ref} />
        <div className="cs cs-4" ref={cs4Ref} />
        <div className="cs cs-5" ref={cs5Ref} />
      </div>

      <div className="contact-inner">

        {/* ── LEFT ── */}
        <div className="contact-left">
          <div className="contact-left-top">
            <span className="contact-eyebrow" ref={eyebrowRef}>{t("contactEyebrow")}</span>
            <h2 className="contact-title" ref={titleRef}>
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>

          <p className="contact-subtitle" ref={subtitleRef}>
            {subtitleLines.map((line, i) => (
              <span key={i}>{line}{i < subtitleLines.length - 1 && <br />}</span>
            ))}
          </p>

          <div className="contact-info" ref={emailRef}>
            <a href="mailto:hello@braussnetworks.com" className="contact-email">
              hello@braussnetworks.com
            </a>
          </div>

          <div className="contact-socials" ref={socialsRef}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                className="social-icon"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: FORM ── */}
        <div className="contact-right">
          <form className="contact-form-card" ref={formCardRef} onSubmit={handleSubmit}>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="name">{t("contactLabelName")}</label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  placeholder={t("contactPlaceName")} required
                />
              </div>
              <div className="cf-field">
                <label htmlFor="phone">{t("contactLabelPhone")}</label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone} onChange={handleChange}
                  placeholder={t("contactPlacePhone")} required
                />
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="email">{t("contactLabelEmail")}</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                placeholder={t("contactPlaceEmail")} required
              />
            </div>

            <div className="cf-field">
              <label htmlFor="message">{t("contactLabelMsg")}</label>
              <textarea
                id="message" name="message"
                value={formData.message} onChange={handleChange}
                placeholder={t("contactPlaceMsg")} required
              />
            </div>

            {submitStatus === "success" && (
              <div className="cf-status cf-status-success">
                ✓ {t("contactSuccessMsg") || "Pesan berhasil dikirim! Kami akan segera menghubungi kamu."}
              </div>
            )}
            {submitStatus === "error" && (
              <div className="cf-status cf-status-error">
                ✕ {t("contactErrorMsg") || "Gagal mengirim pesan. Coba lagi atau email kami langsung."}
              </div>
            )}

            <div className="cf-submit-wrap">
              <button type="submit" className="cf-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="cf-spinner" />
                    {t("contactSending") || "Mengirim..."}
                  </>
                ) : (
                  <>
                    {t("contactSend")}
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}
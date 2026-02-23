import "../styles/Footer.css"
import logo from "../assets/logobraus.png"

export default function Footer() {
  return (
    <footer className="footer">

      {/* ── Get in Touch header ── */}
      <div className="footer-cta">
        <div className="footer-cta-inner">
          <div className="footer-cta-left">
            <span className="footer-cta-eyebrow">Ready to start?</span>
            <h2 className="footer-cta-heading">Get in Touch.</h2>
          </div>
          <div className="footer-cta-right">
            <p className="footer-cta-sub">
              Have a project in mind? Let's talk about it.<br />
              We'd love to hear from you.
            </p>
            <a href="#contact" className="footer-cta-btn">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="footer-body">

        {/* LEFT — brand block */}
        <div className="footer-left">
          <img src={logo} alt="Brauss" className="footer-logo" />
          <p className="footer-desc">
            A creative house developing<br />
            original ideas, brand experiences<br />
            and intellectual properties<br />
            with long‑term value.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com/braussnetworks" target="_blank" rel="noopener noreferrer" className="footer-social">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>
            <a href="https://linkedin.com/company/brauss" target="_blank" rel="noopener noreferrer" className="footer-social">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* RIGHT — info columns */}
        <div className="footer-right">

          <div className="footer-col">
            <span className="footer-col-label">Navigate</span>
            <ul className="footer-nav">
              {["Home","About","Services","Portfolio","Contact Us"].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ","-")}`} className="footer-nav-link">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-label">Contact</span>
            <a href="mailto:hello@braussnetworks.com" className="footer-email">
              hello@braussnetworks.com
            </a>
            <address className="footer-address">
              18 Office Park, 10th A Floor<br />
              Jl. TB Simatupang No. 18<br />
              Jakarta Selatan 12520
            </address>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bar">
        <span>© 2026 Brauss Group. All rights reserved.</span>
        <span>PT Bumintara Dira Mandaya</span>
      </div>

    </footer>
  )
}
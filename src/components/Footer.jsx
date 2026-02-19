import "../styles/Footer.css"
import logo from "../assets/logobraus.png"
export default function Footer() {
  return (
    <footer className="footer">

      {/* ── Big brand statement ── */}
      <div className="footer-hero">
        <span className="footer-wordmark">
          <img src={logo} alt="Brauss Logo" className="logo-footer" />
          </span>
        <p className="footer-tagline">
          We build brands that are culturally relevant<br />and commercially strong.
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="footer-divider" />

      {/* ── Info columns ── */}
      <div className="footer-grid">

        <div className="footer-col">
          <span className="footer-col-label">Business Email</span>
          <a href="mailto:hello@braussnetworks.com" className="footer-link footer-email">
            hello@braussnetworks.com
          </a>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Office Address</span>
          <address className="footer-address">
            PT Bumintara Dira Mandaya<br />
            18 Office Park 10th A Floor<br />
            Jl. TB Simatupang No. 18<br />
            Jakarta Selatan 12520
          </address>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Social Media</span>
          <div className="footer-socials">
            <a
              href="https://instagram.com/braussnetworks"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @braussnetworks
            </a>
            <a
              href="https://linkedin.com/company/brauss"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              Brauss
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Brauss Group — All rights reserved.</span>
        <span className="footer-legal">PT Bumintara Dira Mandaya</span>
      </div>

    </footer>
  )
}
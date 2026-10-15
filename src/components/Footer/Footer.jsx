import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>© {new Date().getFullYear()} Sandy Beans Coffee LLC · North Port, FL</span>
        <span>California inspired. Florida established 2025.</span>
      </div>
    </footer>
  )
}

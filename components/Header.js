export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="logo-svg-wrapper">
                <img src="/assets/images/rush_logo.svg" alt="Rush Browser Logo" className="logo-img" />
              </div>
            </a>
          </div>
          <div className="nav-links">
            <a href="/#features">FEATURES</a>
            <a href="/#comparison">COMPARE</a>
            <a href="/#roadmap">ROADMAP</a>
            <a href="/#download">DOWNLOAD</a>
            <a href="/donate">DONATE</a>
            <a href="/contact">CONTACT</a>
          </div>
          <a href="/#download" className="download-btn">DOWNLOAD</a>
        </nav>
      </div>
    </header>
  );
}
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/images/rush_logo.svg" alt="Rush Browser Logo" className="logo-img" />
            <p>Professional-grade browsing for the decentralized era.</p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 RUSH BROWSER. PROPRIETARY & CONFIDENTIAL.</p>
          <div style={{ marginTop: '16px', textAlign: 'center', color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
            Follow us on
            <a href="https://x.com/rushbrowser" target="_blank" style={{ display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle', lineHeight: '1', color: 'var(--white)', textDecoration: 'none' }}>
              <svg width="15" height="15" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
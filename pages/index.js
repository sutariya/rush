import Head from 'next/head';
import Script from 'next/script';

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rush Browser | Native HNS & ENS Support for Decentralized Web</title>
        <meta name="description" content="Rush Browser natively resolves Handshake (HNS) and Ethereum Name Service (ENS) domains — eliminating the need for extensions or third-party services. Access the decentralized web with enterprise-grade speed, security, and zero tracking." />
        <meta name="keywords" content="HNS browser, ENS browser, Handshake domain, Ethereum Name Service, decentralized web, blockchain browser, Rush Browser, web3 browser, next-gen internet, .bit, .eth, multi-tab browsing, zero tracking" />
        <meta property="og:title" content="Rush Browser — Native HNS & ENS Support for Decentralized Web" />
        <meta property="og:description" content="Access decentralized websites seamlessly with Rush Browser — the first professional browser with native HNS and ENS resolution. Built for developers and privacy-focused users." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://RushBrowser.com" />
        <meta property="og:image" content="https://RushBrowser.com/card.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RushBrowser" />
        <meta name="twitter:title" content="Rush Browser — Native HNS & ENS Support for Decentralized Web" />
        <meta name="twitter:description" content="Access decentralized websites seamlessly with Rush Browser — the first professional browser with native HNS and ENS resolution. Built for developers and privacy-focused users." />
        <meta name="twitter:image" content="https://RushBrowser.com/card.png" />
        <link rel="icon" href="/assets/images/favicon.ico?v=2" type="image/x-icon" />
      </Head>

      <header>
        <div className="container">
            <nav>
                <div className="logo">
                     <a href="index.html" style={{textDecoration: 'none', color: 'inherit'}}>
                        <div className="logo-svg-wrapper">
                            <img src="/assets/images/rush_logo.svg" alt="Rush Browser Logo" className="logo-img" />
                        </div>
                    </a>
                </div>
                <div className="nav-links">
                    <a href="#features">FEATURES</a>
                    <a href="#comparison">COMPARE</a>
                    <a href="#roadmap">ROADMAP</a>
                    <a href="#download">DOWNLOAD</a>
                    <a href="donate.html">DONATE</a>
                    <a href="contact.html">CONTACT</a>
                </div>
                <a href="#download" className="download-btn">DOWNLOAD</a>
            </nav>
        </div>
      </header>

      <main>
        <section className="hero">
            <div className="container">
                <h1>DECENTRALIZED BROWSING. REDEFINED.</h1>
                <p>Rush Browser resolves HNS and ENS domains natively, delivering seamless access to the next-generation internet with uncompromising speed and security.</p>
                <div className="hero-buttons">
                    <a href="#download" className="primary-btn">DOWNLOAD NOW</a>
                    <a href="#features" className="secondary-btn">LEARN MORE</a>
                </div>
            </div>
        </section>

        <section className="features" id="features">
            <div className="container">
                <div className="section-title">
                    <h2>PRECISION ENGINEERED</h2>
                    <p>Designed for the future of the web with uncompromising attention to detail</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-svg" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px'}}>
                            <img src="/assets/images/hns.svg" alt="Handshake (HNS) Logo" style={{height: '60px'}} />
                            <span style={{color: 'var(--white)', fontSize: '2rem'}}>+</span>
                            <img src="/assets/images/ens.svg" alt="Ethereum Name Service (ENS) Logo" style={{height: '60px'}} />
                        </div>
                        <h3>NATIVE HNS & ENS RESOLUTION</h3>
                        <p>Unlock the decentralized web. Rush provides native resolution for Handshake's millions of TLDs and SLDs, alongside seamless support for Ethereum Name Service (.eth) domains. No extensions, no proxies, just direct access.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><i className="fas fa-clone"></i></div>
                        <h3>FOCUSED MULTI-TAB BROWSING</h3>
                        <p>Experience a streamlined and efficient workflow. Manage multiple decentralized websites with a clean, fast tab interface designed for the unique demands of HNS and ENS browsing — no bloat, no lag.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                        <h3>ABSOLUTE ZERO TRACKING</h3>
                        <p>Your online activity is yours alone. Rush is built on a foundation of privacy with no analytics, no cookies, and no telemetry. We don't just promise privacy, we've engineered it into the core of our browser.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="comparison" id="comparison">
            <div className="container">
                <div className="section-title">
                    <h2>WHY CHOOSE RUSH?</h2>
                    <p>Compare Rush with other popular browsers</p>
                </div>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>
                                <div className="browser-header">
                                    <img src="/assets/images/chrome.svg" className="browser-logo" alt="Chrome" />
                                    <span>Chrome</span>
                                </div>
                            </th>
                            <th>
                                <div className="browser-header">
                                    <img src="/assets/images/brave.svg" className="browser-logo" alt="Brave" />
                                    <span>Brave</span>
                                </div>
                            </th>
                            <th>
                                <div className="browser-header">
                                    <img src="/assets/images/rush.svg" className="browser-logo" alt="Rush" />
                                    <span>Rush</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Native HNS Support</td><td><i className="fas fa-times cross"></i></td><td><i className="fas fa-times cross"></i></td><td><i className="fas fa-check checkmark"></i></td></tr>
                        <tr><td>Native ENS Support</td><td><i className="fas fa-times cross"></i></td><td><i className="fas fa-check checkmark"></i></td><td><i className="fas fa-check checkmark"></i></td></tr>
                        <tr><td>Zero Tracking</td><td><i className="fas fa-times cross"></i></td><td><i className="fas fa-check checkmark"></i></td><td><i className="fas fa-check checkmark"></i></td></tr>
                        <tr><td>Web3 Focused</td><td><i className="fas fa-times cross"></i></td><td><i className="fas fa-check checkmark"></i></td><td><i className="fas fa-check checkmark"></i></td></tr>
                        <tr><td>Lightweight</td><td><i className="fas fa-times cross"></i></td><td><i className="fas fa-check checkmark"></i></td><td><i className="fas fa-check checkmark"></i></td></tr>
                        <tr>
                            <td>Open Source</td>
                            <td><i className="fas fa-check checkmark"></i></td>
                            <td><i className="fas fa-check checkmark"></i></td>
                            <td><div className="tooltip"><i className="fas fa-times cross"></i><span className="tooltiptext">Will be open source soon</span></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="roadmap" id="roadmap">
            <div className="container">
                <div className="section-title">
                    <h2>DEVELOPMENT ROADMAP</h2>
                    <p>Our vision for the future of decentralized browsing</p>
                </div>
                <div className="roadmap-timeline">
                    <div className="roadmap-item"><div className="roadmap-date">Q1 2025</div><div className="roadmap-content"><h3>Initial Release</h3><p>Launch of Rush Browser v1.0 with native HNS and ENS resolution, multi-tab support, and basic privacy features.</p></div></div>
                    <div className="roadmap-item"><div className="roadmap-date">Q2 2025</div><div className="roadmap-content"><h3>Enhanced Protocol Support</h3><p>Implementation of DANE support for HNS and integration of additional browser rendering engines with UI improvements.</p></div></div>
                    <div className="roadmap-item"><div className="roadmap-date">Q3 2025</div><div className="roadmap-content"><h3>Mobile Version</h3><p>Release of Rush Browser for iOS and Android, bringing decentralized browsing to mobile devices.</p></div></div>
                    <div className="roadmap-item"><div className="roadmap-date">Q4 2025</div><div className="roadmap-content"><h3>Web3 Integration</h3><p>Built-in cryptocurrency wallet, dApp browser, and enhanced support for blockchain-based applications.</p></div></div>
                </div>
            </div>
        </section>

        <section className="download" id="download">
            <div className="container">
                <div className="section-title">
                    <h2>DOWNLOAD RUSH BROWSER v1.0.0</h2>
                    <p>Professional-grade browser for Windows, macOS, and Linux</p>
                </div>
                <div className="download-options">
                    <div className="download-card">
                        <div className="download-icon"><i className="fab fa-windows"></i></div>
                        <h3>WINDOWS</h3>
                        <p>Choose your preferred version</p>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px'}}>
                            <div className="tooltip" style={{display: 'inline-block'}}><a href="https://github.com/sutariya/rush/releases/download/1.0.0/Rush.Browser.Setup.1.0.0.exe" target="_blank" className="download-link">INSTALLER</a><span className="tooltiptext">Standard installation with automatic updates</span></div>
                            <div className="tooltip" style={{display: 'inline-block'}}><a href="https://github.com/sutariya/rush/releases/download/1.0.0/Rush.Browser.1.0.0.exe" target="_blank" className="download-link">PORTABLE</a><span className="tooltiptext">Run without installation</span></div>
                        </div>
                    </div>
                    <div className="download-card">
                        <div className="download-icon"><i className="fab fa-apple"></i></div>
                        <h3>macOS</h3>
                        <p>Choose your preferred version</p>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px'}}>
                            <div className="tooltip" style={{display: 'inline-block'}}><a href="https://github.com/sutariya/rush/releases/download/1.0.0/Rush.Browser-1.0.0-arm64.dmg" target="_blank" className="download-link">ARM64</a><span className="tooltiptext">For Apple Silicon (M1/M2/M3)</span></div>
                            <div className="tooltip" style={{display: 'inline-block'}}><a href="https://github.com/sutariya/rush/releases/download/1.0.0/Rush.Browser-1.0.0.dmg" target="_blank" className="download-link">INTEL</a><span className="tooltiptext">For Intel-based Macs</span></div>
                        </div>
                    </div>
                    <div className="download-card">
                        <div className="download-icon"><i className="fab fa-linux"></i></div>
                        <h3>LINUX</h3>
                        <p>AppImage 64-bit</p>
                        <div className="tooltip" style={{display: 'inline-block', marginTop: '20px'}}><a href="https://github.com/sutariya/rush/releases/download/1.0.0/Rush.Browser-1.0.0.AppImage" target="_blank" className="download-link" style={{padding: '14px 28px'}}>DOWNLOAD</a><span className="tooltiptext">Runs on most Linux distributions</span></div>
                    </div>
                </div>
                <p style={{textAlign:'center', marginTop:'32px', color:'#777', fontSize:'16px'}}>All downloads are direct from GitHub — no login required.</p>
            </div>
        </section>

        <section className="about" id="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2>ABOUT RUSH</h2>
                        <p>Rush represents the next evolution in web browsing — engineered for pioneers of the decentralized internet who demand precision, performance, and uncompromising privacy.</p>
                        <p>Our architecture combines enterprise-grade security with native, zero-configuration support for decentralized naming protocols like Handshake (HNS) and Ethereum Name Service (ENS). We eliminate the complexity of extensions and gateways, providing direct, seamless access to the dWeb.</p>
                        <p>Rush Browser is developed and maintained by Rahul Sutariya, with a singular vision: to make accessing the decentralized web as simple, fast, and secure as possible.</p>
                    </div>
                    <div className="about-image"><img src="/assets/images/preview.png" alt="Rush Browser Interface Preview" className="about-logo" /></div>
                </div>
            </div>
        </section>
      </main>

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
                   <div style={{marginTop: '16px', textAlign: 'center', color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                      Follow us on
                      <a href="https://x.com/rushbrowser" target="_blank" style={{display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle', lineHeight: '1', color: 'var(--white)', textDecoration: 'none'}}>
                          <svg width="15" height="15" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/></svg>
                      </a>
                  </div>
              </div>
          </div>
      </footer>

      <Script id="smooth-scroll" strategy="afterInteractive">
        {`
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  if(targetId === '#') return;
                  const targetElement = document.querySelector(targetId);
                  if(targetElement) {
                      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
                  }
              });
          });
        `}
      </Script>
    </>
  );
}
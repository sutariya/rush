import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

      <Header />

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
                <div className="feature-icon">+</div>
                <h3>NATIVE HNS & ENS RESOLUTION</h3>
                <p>Unlock the decentralized web. Rush provides native resolution for Handshake's millions of TLDs and SLDs, alongside seamless support for Ethereum Name Service (.eth) domains. No extensions, no proxies, just direct access.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">+</div>
                <h3>FOCUSED MULTI-TAB BROWSING</h3>
                <p>Experience a streamlined and efficient workflow. Manage multiple decentralized websites with a clean, fast tab interface designed for the unique demands of HNS and ENS browsing — no bloat, no lag.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">+</div>
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
                  <th>Chrome</th>
                  <th>Brave</th>
                  <th>Rush</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Native HNS Support</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Native ENS Support</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Zero Tracking</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Web3 Focused</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Lightweight</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Open Source</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td>Will be open source soon</td>
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
              <div className="roadmap-item">
                <h3>Q1 2025</h3>
                <h4>Initial Release</h4>
                <p>Launch of Rush Browser v1.0 with native HNS and ENS resolution, multi-tab support, and basic privacy features.</p>
              </div>
              <div className="roadmap-item">
                <h3>Q2 2025</h3>
                <h4>Enhanced Protocol Support</h4>
                <p>Implementation of DANE support for HNS and integration of additional browser rendering engines with UI improvements.</p>
              </div>
              <div className="roadmap-item">
                <h3>Q3 2025</h3>
                <h4>Mobile Version</h4>
                <p>Release of Rush Browser for iOS and Android, bringing decentralized browsing to mobile devices.</p>
              </div>
              <div className="roadmap-item">
                <h3>Q4 2025</h3>
                <h4>Web3 Integration</h4>
                <p>Built-in cryptocurrency wallet, dApp browser, and enhanced support for blockchain-based applications.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="download" id="download">
          <div className="container">
            <div className="section-title">
              <h2>DOWNLOAD RUSH BROWSER v1.0.1</h2>
              <p>Professional-grade browser for Windows, macOS, and Linux</p>
            </div>
            <div className="download-options">
              <div className="download-card">
                <h3>WINDOWS</h3>
                <p>Choose your preferred version</p>
                <a href="https://github.com/sutariya/rush/releases/download/1.0.1/Rush.Browser.Setup.1.0.1.exe" className="download-link">INSTALLER<small>Standard installation with automatic updates</small></a>
                <a href="https://github.com/sutariya/rush/releases/download/1.0.1/Rush.Browser.1.0.1.exe" className="download-link">PORTABLE<small>Run without installation</small></a>
              </div>
              <div className="download-card">
                <h3>macOS</h3>
                <p>Universal build for all Macs</p>
                <a href="https://github.com/sutariya/rush/releases/download/1.0.1/RushBrowser-macOS-1.0.1.dmg" className="download-link">DOWNLOAD<small>Supports Apple Silicon and Intel</small></a>
              </div>
              <div className="download-card">
                <h3>LINUX</h3>
                <p>Choose your preferred version</p>
                <a href="https://github.com/sutariya/rush/releases/download/1.0.1/rush-browser_1.0.1_amd64.deb" className="download-link">DEB (Ubuntu/Debian)<small>DOWNLOAD</small></a>
                <a href="https://github.com/sutariya/rush/releases/download/1.0.1/Rush.Browser-1.0.1.AppImage" className="download-link">APPIMAGE<small>Runs on most Linux distributions</small></a>
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '32px', color: '#777', fontSize: '16px' }}>All downloads are direct from GitHub — no login required.</p>
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
              <div className="about-image">
                <img src="/assets/images/preview.png" alt="Rush Browser Interface Preview" className="about-logo" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Script id="smooth-scroll" strategy="afterInteractive">
        {`
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  if (targetId === '#') return;
                  const targetElement = document.querySelector(targetId);
                  if (targetElement) {
                      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
                  }
              });
          });
        `}
      </Script>
    </>
  );
}
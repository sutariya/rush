import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DonatePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Donate to Rush Browser | Support Decentralized Web Development</title>
        <meta name="description" content="Support the development of Rush Browser, the professional browser with native HNS and ENS support. Your donation helps build a truly decentralized internet." />
        <meta name="keywords" content="donate Rush Browser, support decentralized web, HNS donation, ENS donation, blockchain browser donation" />
        <link rel="icon" href="/assets/images/favicon.ico?v=2" type="image/x-icon" />
      </Head>

      <Header />

      <main>
        <section className="donation">
          <div className="container">
            <div className="section-title">
              <h2>SUPPORT THE MISSION</h2>
              <p>Your contribution directly funds development and helps build a truly decentralized internet.</p>
            </div>
            <div className="donation-grid">
              <div className="donation-card">
                <h3>BITCOIN (BTC)</h3>
                <p>bc1q0ck0a6tw968jgxq0wyhtj4hh9x40uwr58pxkk2</p>
                <button className="copy-btn" data-clipboard-text="bc1q0ck0a6tw968jgxq0wyhtj4hh9x40uwr58pxkk2">COPY ADDRESS</button>
              </div>
              <div className="donation-card">
                <h3>ETHEREUM (ETH)</h3>
                <p>0x4Fb2F4832B73317Fd40CaAa239E4bbe372e0B785</p>
                <button className="copy-btn" data-clipboard-text="0x4Fb2F4832B73317Fd40CaAa239E4bbe372e0B785">COPY ADDRESS</button>
              </div>
              <div className="donation-card">
                <h3>HANDSHAKE (HNS)</h3>
                <p>hs1qtpuathajfnhnfv6gnzqqpx5tkkcrga6lpaja49</p>
                <button className="copy-btn" data-clipboard-text="hs1qtpuathajfnhnfv6gnzqqpx5tkkcrga6lpaja49">COPY ADDRESS</button>
              </div>
            </div>

            <div className="donation-form">
              <h3>LET US KNOW YOU DONATED (OPTIONAL)</h3>
              <form id="donationForm">
                <input type="text" name="name" placeholder="Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="text" name="company" placeholder="Company" />
                <input type="text" name="amount" placeholder="Amount Donated (e.g., 0.1 ETH)" />
                <button type="submit" id="submitBtn">Submit Details</button>
                <p>This information is completely optional. Feel free to donate anonymously.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Script
        id="clipboard-js"
        strategy="beforeInteractive"
        src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js"
      />
      <Script id="donation-form" strategy="afterInteractive">
        {`
          document.addEventListener('DOMContentLoaded', () => {
            if (typeof ClipboardJS === 'undefined') {
              console.error('ClipboardJS is not loaded. Please check the script source.');
              return;
            }

            const donationForm = document.getElementById('donationForm');
            const submitBtn = document.getElementById('submitBtn');
            const copyButtons = document.querySelectorAll('.copy-btn');

            // Clipboard functionality
            const clipboard = new ClipboardJS(copyButtons);
            clipboard.on('success', (e) => {
              e.trigger.textContent = 'COPIED!';
              setTimeout(() => {
                e.trigger.textContent = 'COPY ADDRESS';
              }, 2000);
            });
            clipboard.on('error', (e) => {
              console.error('Clipboard copy failed:', e);
              e.trigger.textContent = 'COPY FAILED';
              setTimeout(() => {
                e.trigger.textContent = 'COPY ADDRESS';
              }, 2000);
            });

            // Form submission
            donationForm.addEventListener('submit', async function(e) {
              e.preventDefault();
              const originalBtnText = submitBtn.innerText;
              submitBtn.disabled = true;
              submitBtn.innerText = 'Submitting...';

              const formData = new FormData(donationForm);
              const data = Object.fromEntries(formData.entries());
              data.formType = 'donation';

              try {
                const response = await fetch('/api/send-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  submitBtn.innerText = 'Details Submitted!';
                  donationForm.reset();
                } else {
                  const errorData = await response.json();
                  throw new Error(errorData.error || 'Something went wrong.');
                }
              } catch (error) {
                submitBtn.innerText = 'Submission Failed';
                console.error('Form submission error:', error);
                alert('There was an error submitting your details. Please try again.');
              } finally {
                setTimeout(() => {
                  submitBtn.disabled = false;
                  submitBtn.innerText = originalBtnText;
                }, 3000);
              }
            });
          });
        `}
      </Script>
    </>
  );
}
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from 'next/script';

export default function ContactPage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Rush Browser | Get in Touch</title>
        <meta name="description" content="Contact the Rush Browser team for inquiries, bug reports, feature requests, or general questions about our decentralized web browser." />
        <meta name="keywords" content="contact Rush Browser, HNS browser support, ENS browser support, decentralized browser contact" />
        <link rel="icon" href="/assets/images/favicon.ico?v=2" type="image/x-icon" />
      </Head>

      <Header />

      <main>
        <section className="contact">
          <div className="container">
            <div className="section-title">
              <h2>GET IN TOUCH</h2>
              <p>We'd love to hear from you. Please fill out the form below.</p>
            </div>
            <form id="contactForm">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <select name="subject" required>
                <option value="" disabled selected>Select a reason...</option>
                <option value="Investor Inquiry">Investor Inquiry</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="General Question">General Question</option>
              </select>
              <textarea name="message" placeholder="Message" required></textarea>
              <button type="submit" id="submitBtn">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <Script id="contact-form" strategy="afterInteractive">
        {`
          const contactForm = document.getElementById('contactForm');
          const submitBtn = document.getElementById('submitBtn');

          contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const originalBtnText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            data.formType = 'contact';

            try {
              const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              });

              if (response.ok) {
                submitBtn.innerText = 'Message Sent!';
                contactForm.reset();
              } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong.');
              }
            } catch (error) {
              submitBtn.innerText = 'Send Failed';
              console.error('Form submission error:', error);
              alert('There was an error sending your message. Please try again.');
            } finally {
              setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
              }, 3000);
            }
          });
        `}
      </Script>
    </>
  );
}
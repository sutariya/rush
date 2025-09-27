import { Resend } from 'resend';

// 🔗 Explorer URLs — cleaned (no trailing spaces)
const explorers = {
  BTC: 'https://blockstream.info/tx/',
  ETH: 'https://etherscan.io/tx/',
  HNS: 'https://shakeshift.com/transaction/',
  USDT: 'https://tronscan.org/#/transaction/',
  USDC: 'https://tronscan.org/#/transaction/',
  XMR: 'https://xmrchain.net/search?value=',
  SOL: 'https://solscan.io/tx/',
  LTC: 'https://blockchair.com/litecoin/transaction/',
  BNB: 'https://bscscan.com/tx/',
  PAYPAL: '',
};

// Helper function to clean and validate URLs
const cleanExplorerUrl = (url, txHash) => {
  if (!url || !txHash) return null;
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;
  return cleanUrl + encodeURIComponent(txHash.trim());
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      name,
      xHandle,
      email,
      subject,
      message,
      company,
      amount,
      network,
      txHash,
      formType
    } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    let emailSubject, emailHtml;

    if (formType === 'contact') {
      if (!subject?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'Subject and message are required' });
      }
      emailSubject = `Contact Form: ${subject.trim()}`;
      emailHtml = `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${(name || 'Anonymous').trim()} <${email.trim()}></p>
        <p><strong>Subject:</strong> ${subject.trim()}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.trim().replace(/\n/g, '<br>')}</p>
      `;
    } else if (formType === 'donation') {
      if (!amount?.trim() || !network?.trim()) {
        return res.status(400).json({ error: 'Amount and network are required' });
      }

      const cleanTxHash = txHash?.trim();
      const cleanNetwork = network.trim();

      let txLink = null;
      if (cleanTxHash && explorers.hasOwnProperty(cleanNetwork)) {
        if (cleanNetwork === 'PAYPAL') {
          txLink = null;
        } else {
          txLink = cleanExplorerUrl(explorers[cleanNetwork], cleanTxHash);
        }
      }

      emailSubject = `Donation Received: ${amount.trim()} ${cleanNetwork}`;
      emailHtml = `
        <h2>🎉 New Donation!</h2>
        <ul>
          <li><strong>Name:</strong> ${(name || 'Anonymous').trim()}</li>
          <li><strong>X Handle:</strong> ${(xHandle || '—').trim()}</li>
          <li><strong>Email:</strong> ${email.trim()}</li>
          <li><strong>Company:</strong> ${(company || '—').trim()}</li>
          <li><strong>Amount:</strong> ${amount.trim()} ${cleanNetwork}</li>
          <li><strong>Network:</strong> ${cleanNetwork}</li>
          <li><strong>Transaction:</strong> ${
            txLink
              ? `<a href="${txLink}" target="_blank" style="color: #00ffaa; text-decoration: none;">View on Explorer</a>`
              : cleanTxHash
                ? `<code style="color: #aaa; font-size: 0.9em;">${cleanTxHash}</code>`
                : 'Not provided'
          }</li>
        </ul>
        <p><em>Donations over $5000 qualify for Premium Donor listing. Verify transaction manually.</em></p>
      `;
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Rush Browser <no-reply@updates.rushbrowser.com>',
      to: ['support@rushbrowser.com'],
      replyTo: email.trim(),
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({
        error: 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({
      message: 'Email sent successfully!',
      id: data?.id,
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
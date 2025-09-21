// File: /api/send-email.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Add CORS headers for browser requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight OPTIONS request
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

    // Validate essential fields
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    let emailSubject, emailHtml;

    if (formType === 'contact') {
      if (!subject || !subject.trim() || !message || !message.trim()) {
        return res.status(400).json({ error: 'Subject and message are required' });
      }
      emailSubject = `Contact Form: ${subject.trim()}`;
      emailHtml = `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${(name || 'Anonymous').trim()} &lt;${email.trim()}&gt;</p>
        <p><strong>Subject:</strong> ${subject.trim()}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.trim().replace(/\n/g, '<br>')}</p>
      `;
    } else if (formType === 'donation') {
      if (!amount || !amount.trim() || !network || !network.trim() || !txHash || !txHash.trim()) {
        return res.status(400).json({ error: 'Amount, network, and transaction hash are required' });
      }

      // Generate transaction explorer link
      let txLink = 'N/A';
      if (txHash && txHash.trim()) {
        const cleanTxHash = txHash.trim();
        switch (network) {
          case 'BTC':
            txLink = `https://blockstream.info/tx/${cleanTxHash}`;
            break;
          case 'ETH':
            txLink = `https://etherscan.io/tx/${cleanTxHash}`;
            break;
          case 'HNS':
            txLink = `https://shakeshift.com/tx/${cleanTxHash}`;
            break;
          default:
            txLink = 'N/A';
        }
      }

      emailSubject = `Donation Received: ${amount.trim()} ${network}`;
      emailHtml = `
        <h2>🎉 New Donation!</h2>
        <ul>
          <li><strong>Name:</strong> ${(name || 'Anonymous').trim()}</li>
          <li><strong>X Handle:</strong> ${(xHandle || '—').trim()}</li>
          <li><strong>Email:</strong> ${email.trim()}</li>
          <li><strong>Company:</strong> ${(company || '—').trim()}</li>
          <li><strong>Amount:</strong> ${amount.trim()} ${network}</li>
          <li><strong>Network:</strong> ${network}</li>
          <li><strong>Transaction:</strong> ${txHash ? `<a href="${txLink}" target="_blank" style="color: #00ffaa;">View on Explorer</a>` : '—'}</li>
        </ul>
        <p><em>Donations over $5000 qualify for Premium Donor listing. Verify transaction manually.</em></p>
      `;
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    // Check for required environment variable
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Rush Browser <no-reply@updates.rushbrowser.com>',
      to: ['support@rushbrowser.com'], // Replace with your actual email
      replyTo: email.trim(),
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ 
        error: 'Failed to send email', 
        details: process.env.NODE_ENV === 'development' ? error : undefined 
      });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ 
      message: 'Email sent successfully!',
      id: data?.id 
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
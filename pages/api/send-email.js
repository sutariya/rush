// File: /api/send-email.js
import { Resend } from 'resend';

export default async function handler(req, res) {
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
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let emailSubject, emailHtml;

    if (formType === 'contact') {
      if (!subject || !message) {
        return res.status(400).json({ error: 'Subject and message are required' });
      }
      emailSubject = `Contact Form: ${subject}`;
      emailHtml = `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name || 'Anonymous'} <${email}></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;
    } else if (formType === 'donation') {
      // ✅ Use shakeshift.com for HNS
      let txLink = txHash ? (
        network === 'BTC' ? `https://blockstream.info/tx/${txHash}` :
        network === 'ETH' ? `https://etherscan.io/tx/${txHash}` :
        network === 'HNS' ? `https://shakeshift.com/tx/${txHash}` : 'N/A'
      ) : 'N/A';

      emailSubject = `Donation Received: ${amount || 'Unknown'} ${network || ''}`;
      emailHtml = `
        <h2>🎉 New Donation!</h2>
        <ul>
          <li><strong>Name:</strong> ${name || 'Anonymous'}</li>
          <li><strong>X Handle:</strong> ${xHandle || '—'}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Company:</strong> ${company || '—'}</li>
          <li><strong>Amount:</strong> ${amount || '—'} ${network || ''}</li>
          <li><strong>Network:</strong> ${network || '—'}</li>
          <li><strong>Transaction:</strong> ${txHash ? `<a href="${txLink}" target="_blank" style="color: #00ffaa;">View on Explorer</a>` : '—'}</li>
        </ul>
        <p><em>Donations over $5000 qualify for Premium Donor listing. Verify transaction manually.</em></p>
      `;
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // ✅ SEND EMAIL TO YOU — REPLACE WITH YOUR EMAIL
    const { data, error } = await resend.emails.send({
      from: 'Rush Browser <no-reply@updates.rushbrowser.com>',
      to: ['support@rushbrowser.com'], // 👈 REPLACE THIS WITH YOUR EMAIL
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
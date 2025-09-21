// api/send-email.js
import { Resend } from 'resend';

// Log to confirm .env is loaded
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Loaded' : 'Missing');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log('📥 Received body:', req.body);
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

    // Basic validation
    if (!email || !formType) {
      console.log('❌ Missing email or formType');
      return res.status(400).json({ error: 'Email and form type are required' });
    }

    let emailSubject, emailHtml;

    if (formType === 'contact') {
      if (!subject || !message) {
        return res.status(400).json({ error: 'Subject and message are required for contact form' });
      }
      emailSubject = `New Contact Form Message: ${subject}`;
      emailHtml = `
        <h1>New Contact Inquiry</h1>
        <p><strong>From:</strong> ${name || 'Anonymous'} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${(message || '').replace(/\n/g, '<br>')}</p>
      `;
    } else if (formType === 'donation') {
      // ✅ Generate correct blockchain explorer link
      let txLink = txHash ? (
        network === 'BTC' ? `https://blockstream.info/tx/${txHash}` :
        network === 'ETH' ? `https://etherscan.io/tx/${txHash}` :
        network === 'HNS' ? `https://shakeshift.com/tx/${txHash}` : ''
      ) : '';

      emailSubject = `New Donation Notification from ${name || 'Anonymous'}`;
      emailHtml = `
        <h1>Donation Notification! 🎉</h1>
        <ul>
          <li><strong>Name:</strong> ${name || 'Not provided'}</li>
          <li><strong>X Handle:</strong> ${xHandle || 'Not provided'}</li>
          <li><strong>Email:</strong> ${email || 'Not provided'}</li>
          <li><strong>Company:</strong> ${company || 'Not provided'}</li>
          <li><strong>Amount Donated:</strong> ${amount || 'Not provided'} ${network || ''}</li>
          <li><strong>Network:</strong> ${network || 'Not provided'}</li>
          <li><strong>Transaction Hash:</strong> ${txHash ? `<a href="${txLink}" target="_blank" style="color: #00ffaa; text-decoration: underline;">View on Explorer</a>` : 'Not provided'}</li>
        </ul>
        <p>${parseFloat(amount) >= 5000 ? '🌟 Thank you for your generous donation! You will be listed as a Premium Donor on our <a href="https://www.rushbrowser.com/donors" target="_blank" style="color: #00ffaa; text-decoration: underline;">Donors Page</a>.' : 'Thank you for supporting Rush Browser!'}</p>
        <hr>
        <p style="font-size: 0.9rem; color: #888;">
          <em>This is an automated message. Please do not reply.</em>
        </p>
      `;
    } else {
      console.log('❌ Invalid formType:', formType);
      return res.status(400).json({ error: 'Invalid form type' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Missing RESEND_API_KEY');
      return res.status(500).json({ error: 'Server configuration error: Missing Resend API key' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Rush Browser Forms <no-reply@updates.rushbrowser.com>',
      to: [email],
      replyTo: 'support@rushbrowser.com',
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Resend error:', JSON.stringify(error, null, 2));
      return res.status(error.statusCode || 400).json({ error: `Failed to send email: ${error.message}` });
    }

    console.log('✅ Email sent:', data);
    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('💥 Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
}
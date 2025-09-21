// server.js
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
import 'dotenv/config';

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from /public
app.use(express.static('public'));

// Email API endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message, company, amount, formType } = req.body;

    let emailSubject, emailHtml;

    if (formType === 'contact') {
      emailSubject = `New Contact Form Message: ${subject}`;
      emailHtml = `
        <h1>New Contact Inquiry</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;
    } else if (formType === 'donation') {
      emailSubject = `New Donation Notification from ${name || 'Anonymous'}`;
      emailHtml = `
        <h1>Donation Notification! 🎉</h1>
        <ul>
          <li><strong>Name:</strong> ${name || 'Not provided'}</li>
          <li><strong>Email:</strong> ${email || 'Not provided'}</li>
          <li><strong>Company:</strong> ${company || 'Not provided'}</li>
          <li><strong>Amount Donated:</strong> ${amount || 'Not provided'}</li>
        </ul>
        <p>You can verify this on the blockchain.</p>
      `;
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Rush Browser Forms <onboarding@resend.dev>',
      to: ['YOUR_EMAIL@example.com'], // ⚠️ REPLACE THIS WITH YOUR EMAIL
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: 'Failed to send email via Resend.' });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fallback: serve index.html for any unknown route (optional, for SPA-like behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📂 Static files served from /public`);
  console.log(`✉️  Email endpoint: POST http://localhost:${PORT}/api/send-email`);
});
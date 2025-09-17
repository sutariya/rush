// Import the Resend library
import { Resend } from 'resend';

// Instantiate Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// The default exported function is the serverless function handler
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Extract the form data from the request body
    const { name, email, subject, message, company, amount, formType } = req.body;

    // --- CONFIGURE YOUR EMAIL DETAILS ---
    const recipientEmail = 'YOUR_EMAIL@example.com'; // IMPORTANT: Replace with your email address
    let emailSubject;
    let emailHtml;

    // Customize email content based on which form was submitted
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
        <p>Someone has submitted their donation details.</p>
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

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Rush Browser Forms <onboarding@resend.dev>', // Can be a custom domain after verification
      to: [recipientEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    // If there's an error, return it
    if (error) {
      console.error({ error });
      return res.status(400).json({ error: 'Failed to send message.' });
    }

    // On success, return a success message
    console.log({ data });
    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
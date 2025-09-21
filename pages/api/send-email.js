import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message, company, amount, formType } = req.body;
    const recipientEmail = 'rushbrowser@gmail.com';
    let emailSubject;
    let emailHtml;

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

    const { data, error } = await resend.emails.send({
      from: 'Rush Browser Forms <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error({ error });
      return res.status(400).json({ error: 'Failed to send message.' });
    }

    console.log({ data });
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
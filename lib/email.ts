import sgMail from '@sendgrid/mail';

export function setApiKey(key: string) {
  sgMail.setApiKey(key);
}

export async function sendEmail(to: string, subject: string, html: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@lamichhanebasnet.com';
  const msg = { to, from, subject, html };
  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    // Fallback: log to console
    console.log('Fallback email content:', msg);
  }
}

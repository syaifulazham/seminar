import nodemailer from 'nodemailer';

export async function sendRegistrationEmail(email: string, participantId: number) {
  // Initialize the transporter
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Successful',
    text: `Thank you for registering. Please upload your payment proof here: ${process.env.NEXT_PUBLIC_BASE_URL}/upload/${participantId}`,
  });
}

export async function sendAcknowledgmentEmail(email: string) {
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Payment Proof Received',
    text: 'Thank you for submitting your payment proof. We will review it shortly.',
  });
}

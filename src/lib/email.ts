import nodemailer from 'nodemailer';

const smtp_options = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT), // Convert to number
    secure: process.env.SMTP_SECURE === "true", // Convert to boolean
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

const smtp_options_2 = {
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Ensure environment variables are defined
if (!smtp_options.host || !smtp_options.port || !smtp_options.auth.user || !smtp_options.auth.pass) {
  throw new Error('Missing required environment variables for SMTP configuration.');
}

export async function sendRegistrationEmail(email: string, participantId: number) {
  // Initialize the transporter
  const transporter = nodemailer.createTransport(smtp_options);

  // Send the email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Successful',
    text: `Thank you for registering. Please upload your payment proof here: ${process.env.NEXT_PUBLIC_BASE_URL}/upload/${participantId}`,
  });
}

export async function sendAcknowledgmentEmail(email: string) {
  const transporter = nodemailer.createTransport(smtp_options);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Payment Proof Received',
    text: 'Thank you for submitting your payment proof. We will review it shortly.',
  });
}

export const sendApprovalEmail = async (email: string, name: string) => {
  const transporter = nodemailer.createTransport(smtp_options);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Payment Proof Approved (Seminar Pengurusan Risiko)',
    text: `Dear ${name},\n\nWe are pleased to inform you that your payment has been approved.\n\nThank you for your participation!\n\nBest regards,\nSeminar Team`,
    html: `<p>Dear ${name},</p><p>We are pleased to inform you that your payment has been approved.</p><p>Thank you for your participation!</p><p>Best regards,<br/>Seminar Team</p>`,
  });
};
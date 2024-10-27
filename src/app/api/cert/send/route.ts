// app/api/cert/send/route.ts
import { NextResponse } from 'next/server';
import { sendCertificateEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { participantId }: { participantId: number } = await req.json();

    if (!participantId) {
      return NextResponse.json({ error: 'participantId is required' }, { status: 400 });
    }

    // Trigger the email sending function
    await sendCertificateEmail(participantId);
    return NextResponse.json({ message: 'Certificate email sent successfully.' });
  } catch (error) {
    console.error('Error sending certificate email:', error);
    return NextResponse.json({ error: 'Failed to send certificate email' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { sendRegistrationEmail } from '@/lib/email';
import prisma from '@/lib/prisma'; // Ensure your prisma is set up correctly

export async function POST(req: NextRequest) {
  try {
    const { participantId, email } = await req.json(); // Parse request body

    if (!participantId || !email) {
      return NextResponse.json({ message: 'Participant ID and email are required' }, { status: 400 });
    }

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
    }

    console.log('Resending invoice for participant: ', participant.email, participant.id);
    await sendRegistrationEmail(participant.email, participant.id); // Send email
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}

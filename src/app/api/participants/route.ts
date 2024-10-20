import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendApprovalEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Parse and validate the ID parameter
    const participantId = parseInt(params.id, 10);
    if (isNaN(participantId)) {
      return NextResponse.json({ message: 'Invalid participant ID' }, { status: 400 });
    }

    // Parse the request body and ensure status is provided
    const { status }: { status: string } = await req.json();
    if (!status) {
      return NextResponse.json({ message: 'Status is required' }, { status: 400 });
    }

    // Find the participant
    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
    }

    // Update participant status
    const updatedParticipant = await prisma.participant.update({
      where: { id: participant.id },
      data: { status },
    });

    // If the status is updated to "Approved", send an approval email
    if (status.toLowerCase() === 'approved') {
      console.log('sending approved email with receipt and invitation');
      await sendApprovalEmail(participant.id);
    }else if (status.toLowerCase() === 'approved_lo') {
      console.log('sending approved email with invitation only');
      await sendApprovalEmail(participant.id, true);
    }

    // Return the updated participant
    return NextResponse.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant:', error);
    return NextResponse.json({ message: 'Failed to update participant status' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const participants = await prisma.participant.findMany();

    // Disable caching by setting the appropriate headers directly
    return NextResponse.json(participants, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache', // Ensures compatibility with HTTP/1.0 caches
        'Expires': '0',       // Forces caches to treat the response as expired immediately
        'Surrogate-Control': 'no-store', // Disable CDN or intermediary caching
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to load participants' },
      { status: 500 }
    );
  }
}

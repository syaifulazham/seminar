import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendApprovalEmail } from '@/lib/email';

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
      await sendApprovalEmail(participant.email, participant.name);
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
    return NextResponse.json(participants);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to load participants' }, { status: 500 });
  }
}

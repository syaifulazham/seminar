import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendApprovalEmail } from '@/lib/email';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await req.json();

  try {
    const participant = await prisma.participant.findUnique({
      where: { id: parseInt(params.id) },
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
    if (status === 'Approved') {
      await sendApprovalEmail(participant.email, participant.name);
    }

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

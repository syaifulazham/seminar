import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const participant = await prisma.participant.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!participant) {
      return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
    }
    return NextResponse.json(participant);
  } catch (error) {
    console.error('Error fetching participant:', error);
    return NextResponse.json({ message: 'Failed to load participant details' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await req.json();

  try {
    const updatedParticipant = await prisma.participant.update({
      where: { id: parseInt(params.id) },
      data: { status },
    });
    return NextResponse.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant:', error);
    return NextResponse.json({ message: 'Failed to update participant status' }, { status: 500 });
  }
}

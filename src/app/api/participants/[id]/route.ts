import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendApprovalEmail } from '@/lib/email';
import { GetPrices } from '@/lib/data';
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const participant = await prisma.participant.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!participant) {
      return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
    }
    return NextResponse.json(participant, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache', // Ensures compatibility with HTTP/1.0 caches
        'Expires': '0',       // Forces caches to treat the response as expired immediately
        'Surrogate-Control': 'no-store', // Disable CDN or intermediary caching
      },
    });
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

    const participant = await prisma.participant.findUnique({
      where: { id: parseInt(params.id) },
    });

    // Ensure participant is not null before proceeding
    if (!participant) {
      throw new Error('Participant not found');
    }

    /*
    const newReceipt = await prisma.receipt.create({
      data: {
        invoice: `IKARKP24-${participant.id.toString().padStart(6, '0')}`,
        item: participant.category,
        amount: GetPrices[participant.category as keyof typeof GetPrices],
        bank: '-',
      },
    });
    */
    const invoiceNumber = `IKARKP24-${participant.id.toString().padStart(6, '0')}`;

    const newReceipt = await prisma.receipt.upsert({
      where: {
        invoice: invoiceNumber,
      },
      update: {
        item: participant.category,
        amount: GetPrices[participant.category as keyof typeof GetPrices],
        bank: '-', // You can modify this field if necessary
      },
      create: {
        invoice: invoiceNumber,
        item: participant.category,
        amount: GetPrices[participant.category as keyof typeof GetPrices],
        bank: '-', // Default bank value
      },
    });


    // Ensure participant is not null before sending email
    if (updatedParticipant && status.toLowerCase() === 'approved') {
      await sendApprovalEmail(updatedParticipant.id);
    }

    return NextResponse.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant:', error);
    return NextResponse.json({ message: 'Failed to update participant status' }, { status: 500 });
  }
}

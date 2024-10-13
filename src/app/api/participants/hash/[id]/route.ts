import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const participant = await prisma.participant.findUnique({
      where: { hashid: params.id },
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
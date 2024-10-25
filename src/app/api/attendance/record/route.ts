import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { qrCode } = await request.json();

  const participant = await prisma.participant.findFirst({
    where: {
      qrCode,  // Ensure this exists in the Prisma schema
      status: { in: ['Approved', 'Approved_LO'] },
      category: { in: ['With HRDC - Physical', 'Without HRDC - Physical'] },
    },
  });

  if (!participant) {
    return NextResponse.json({
      success: false,
      participant: {
        name: '',
        department: '',
        town: '',
        state: '',
      },
      currentAttendance: await prisma.attendance.count(),
    }, { status: 404 });
  }

  // Record attendance
  const attendance = await prisma.attendance.create({
    data: {
      qrCode,
      participantId: participant.id,
      timestamp: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    participant: {
      name: participant.name,
      department: participant.department,
      town: participant.town,
      state: participant.state,
    },
    currentAttendance: await prisma.attendance.count(),
  });
}

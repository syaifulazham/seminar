// /app/api/attendance/record/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming you have Prisma setup

export async function POST(request: Request) {
  const { qrCode } = await request.json();
  
  // Check if participant exists with the required status and category
  const participant = await prisma.participant.findFirst({
    where: {
      qrCode: qrCode, // Use equals to specify the condition
      status: { in: ['Approved', 'Approved_LO'] },
      category: { in: ['With HRDC - Physical', 'Without HRDC - Physical'] },
    },
  });

  if (!participant) {
    console.log('Participant not found or not eligible:', qrCode);
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

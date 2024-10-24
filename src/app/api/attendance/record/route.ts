// /app/api/attendance/record/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming you have Prisma setup

export async function POST(request: Request) {
  const { hashid } = await request.json();
  
  // Check if participant exists with the required status and category
  const participant = await prisma.participant.findFirst({
    where: {
      hashid,
      status: { in: ['Approved', 'Approved_LO'] },
      category: { in: ['With HRDC - Physical', 'Without HRDC - Physical'] },
    },
  });

  if (!participant) {
    return NextResponse.json({ error: 'Participant not found or not eligible' }, { status: 404 });
  }

  // Record attendance
  const attendance = await prisma.attendance.create({
    data: {
      hashid: participant.hashid,
      timestamp: new Date(),
      participant: { connect: { hashid: participant.hashid } },
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

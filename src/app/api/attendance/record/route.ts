import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const { label, qrCode } = await request.json();

  const participant = await prisma.participant.findFirst({
    where: {
      qrCode,  // Ensure this exists in the Prisma schema
      status: { in: ['Approved', 'Approved_LO'] },
      category: { in: ['With HRDC - Physical', 'Without HRDC - Physical', 'With HRDC - Online', 'Without HRDC - Online'] },
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
      label,
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

interface AttendanceRecord {
  id: string;
  name: string;
  ic: string;
  department: string;
  category: string;
  hrdc: string;
  seminar_mode: string;
  day_1: number;
  day_2: number;
}

// Helper function to stringify BigInt fields
function jsonStringifyBigInt(data: any) {
  return JSON.stringify(data, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
}

export async function GET() {
  try {
    const attendanceRecords: AttendanceRecord[] = await prisma.$queryRaw`
      SELECT 
          a.id,
          a.name,
          a.ic,
          a.email,
          a.telephoneNumber,
          a.department,
          a.category,
          IF(a.category REGEXP 'With HRDC', 'With HRDC', 'Without HRDC') AS hrdc,
          IF(a.category REGEXP 'Physical', 'Physical', 'Online') AS seminar_mode,
          IF(b.id IS NULL, 0, 1) AS day_1,
          IF(c.id IS NULL, 0, 1) AS day_2,
          if(d.id IS NULL, 0, 1) AS cert,
          a.qrCode
      FROM Participant a
      LEFT JOIN (SELECT * FROM Attendance WHERE label = '26-10-2024') b ON a.id = b.participantId
      LEFT JOIN (SELECT * FROM Attendance WHERE label = '27-10-2024') c ON a.id = c.participantId
      LEFT JOIN Certificate d ON a.id = d.participantId
      WHERE a.status REGEXP 'Approved';
    `;

    const responsePayload = {
      success: true,
      attendanceRecords,
      message: 'Attendance records fetched successfully',
    };

    return new NextResponse(jsonStringifyBigInt(responsePayload), { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return NextResponse.json({ error: 'Error fetching attendance records' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
      // Parse the request body
      const { qrCode, label } = await req.json();

      // Validate input
      if (!qrCode || !label) {
          return NextResponse.json({ success: false, message: 'Missing qrCode or label' }, { status: 400 });
      }

      // Delete the attendance record based on qrCode and label
      const deleteResult = await prisma.attendance.deleteMany({
          where: {
            qrCode,
            label,
          },
      });

      if (deleteResult.count === 0) {
          return NextResponse.json({ success: false, message: 'Attendance record not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Attendance record deleted successfully' });
  } catch (error) {
      console.error('Error deleting attendance record:', error);
      return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
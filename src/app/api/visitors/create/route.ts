// /app/api/visitors/create/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();

  const visitor = await prisma.visitor.create({
    data: {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      organizationType: data.organizationType,
      occupationField: data.occupationField,
      gender: data.gender,
      yearOfBirth: data.yearOfBirth,
      state: data.state,
      country: data.country || 'Malaysia',
    },
  });

  return NextResponse.json({ success: true, visitor });
}

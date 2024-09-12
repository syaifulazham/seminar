import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendRegistrationEmail } from '@/lib/email';
import { createHash } from 'crypto';

const generateHash = (id: number, secretKey: string) => {
  return createHash('sha256').update(`${id}${secretKey}`).digest('hex');
};

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    const {
      name,
      ic,
      ministry,
      department,
      address,
      postcode,
      town,
      state,
      country,
      email,
      telephoneNumber,
      category,
    } = body;

    // Save participant data to the database
    const participant = await prisma.participant.create({
      data: {
        name,
        ic,
        ministry,
        department,
        address,
        postcode,
        town,
        state,
        country,
        email,
        telephoneNumber,
        category,
      },
    });

    const hash = generateHash(participant.id, process.env.SECRET_KEY as string);

    // Update the participant with the generated hash
    await prisma.participant.update({
      where: { id: participant.id },
      data: { hashid: hash }, // Ensure 'hash' is defined in the Prisma schema
    });

    // Send acknowledgment email with a link to upload payment proof
    await sendRegistrationEmail(participant.email, participant.id);

    // Return a success response
    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error registering participant:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

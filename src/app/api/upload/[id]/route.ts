import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import { sendAcknowledgmentEmail } from '@/lib/email';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get('paymentProof') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }

    // Create a unique filename and save the file to the file system
    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'uploads');
    
    // Ensure the uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, fileName);

    const fileBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    // Update the participant's record in the database
    const participant = await prisma.participant.update({
      where: { hashid: params.id },
      data: {
        paymentProof: `/uploads/${fileName}`,  // Store file path relative to uploads directory
        status: 'UnderReview',
      },
    });

    // Send acknowledgment email
    await sendAcknowledgmentEmail(participant.email);

    return NextResponse.json({ message: 'Payment proof uploaded successfully', participant });
  } catch (error) {
    console.error('Error uploading payment proof:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

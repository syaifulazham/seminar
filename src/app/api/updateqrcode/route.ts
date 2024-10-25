import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import QRCode from 'qrcode';

const secretKey = process.env.SECRET_KEY || '';

export async function POST() {
  try {
    // Retrieve all participants
    const participants = await prisma.participant.findMany();

    // Loop through each participant to update their qrCode
    for (const participant of participants) {
      // Generate the invoice number
      const invoiceNo = `IKARKP24-${participant.id.toString().padStart(6, '0')}`;

      // Create the data for the QR code and hash it
      const qrCodeData = `${invoiceNo}${secretKey}`;
      const qrCodeHash = crypto.createHash('sha256').update(qrCodeData).digest('hex');

      // Generate the QR code as a Base64 URL
      //const qrCodeUrl = await QRCode.toDataURL(qrCodeHash);
      //const qrStr = qrCodeUrl.split(',')[1];
      //const qrImage = await pdfDoc.embedPng(qrCodeUrl.split(',')[1]);

      // Update the participant record with the new QR code
      await prisma.participant.update({
        where: { id: participant.id },
        data: { qrCode: qrCodeHash } as { qrCode: string }, // Cast to the correct type
      });
    }

    return NextResponse.json({ message: 'All participants updated successfully' });
  } catch (error) {
    console.error('Error updating QR codes:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating QR codes' },
      { status: 500 }
    );
  }
}

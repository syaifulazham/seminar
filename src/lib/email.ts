import nodemailer from 'nodemailer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import prisma from '@/lib/prisma';
import {GetPrices} from '@/lib/data';
import fs from 'fs';
import path from 'path';

// Function to create PDF invoice with a header
async function generateInvoice(participant: {
  id: number;
  name: string;
  ic: string;
  address: string;
  postcode: string;
  town: string;
  state: string;
  country: string;
  telephoneNumber: string;
  email: string;
  ministry: string;
  department: string;
  category: string;
  amountDue: string;
}) {
  const { id, name, ic, address, postcode, town, state, country, telephoneNumber, email, ministry, department, category, amountDue } = participant;

  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the document
  const page = pdfDoc.addPage([600, 800]); // Adjusted height for long content
  const fontSize = 12;
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Load the header image
  const imagePath = path.resolve('./src/lib/images/jkkp-header.png'); // Adjust the path if necessary
  const imageBuffer = fs.readFileSync(imagePath);
  const headerImage = await pdfDoc.embedPng(imageBuffer);

  // Get image dimensions and set position
  const imageDims = headerImage.scale(1); // Adjust the scale as needed

  // Draw the header image at the top of the page
  page.drawImage(headerImage, {
    x: 50,  // Horizontal position
    y: page.getHeight() - imageDims.height - 20,  // Vertical position from the top
    width: imageDims.width,
    height: imageDims.height,
  });

  // Add padding between the header and the content
  let yPosition = page.getHeight() - imageDims.height - 50;

  // Title - INVOIS
  page.drawText('INVOIS', {
    x: 50,
    y: yPosition,
    size: 24,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  yPosition -= 40;

  // Salutation
  page.drawText(`Tuan/Puan/Encik/Cik ${name.toUpperCase()}`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 30;

  // Introductory paragraph
  page.drawText('Anda telah berjaya mendaftarkan diri bagi menghadiri Seminar Garis Panduan', {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  page.drawText('Pentaksiran dan Pengurusan Risiko Psikososial Pekerjaan di Tempat Kerja 2024', {
    x: 50,
    y: yPosition - 15,
    size: fontSize,
    font: timesRomanFont,
  });
  page.drawText('anjuran bersama Pertubuhan Kebajikan Dan Sukan JKKP Cawangan WP Kuala', {
    x: 50,
    y: yPosition - 30,
    size: fontSize,
    font: timesRomanFont,
  });
  page.drawText('Lumpur dan Bahagian Kesihatan Pekerjaan JKKP Malaysia.', {
    x: 50,
    y: yPosition - 45,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 70;

  // Registration Details (Table)
  page.drawText('Maklumat Pendaftaran :', {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  yPosition -= 20;

  // Draw the table with fields
  const tableData = [
    { label: 'No. Invois:', value: `IKARKP24-${id.toString().padStart(6, '0')}` },
    { label: 'Nama:', value: name },
    { label: 'No. kad pengenalan:', value: ic },
    { label: 'Nama dan Alamat Syarikat:', value: `${department}` },
    { label: '', value: `${address}` },
    { label: '', value: `${postcode}, ${town}, ${state}` },
    { label: '', value: `${country}` },
    { label: 'No. telefon:', value: telephoneNumber },
    { label: 'Emel:', value: email },
    {
      label: 'Amaun Perlu Bayar: RM', 
      value: id <= 639 
        ? GetPrices["early_bird"][category as keyof typeof GetPrices["early_bird"]] 
        : GetPrices["normal"][category as keyof typeof GetPrices["normal"]]
    }, 
  ];

  for (const { label, value } of tableData) {
    page.drawText(`${label}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(value.toString(), { // Convert value to string
      x: 200, // Value is placed to the right of the label
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20; // Move the next row down
  }

  // Footer information
  page.drawText(
    'Nota: Sila jelaskan bayaran kepada akaun PKS JKKP MALAYSIA CAWANGAN W/PERSEKUTUAN', {
    x: 50,
    y: yPosition - 20,
    size: fontSize,
    font: timesRomanFont,
  });
  page.drawText('(Maybank : 5644 2720 0291) dan memuatnaik slip pembayaran di dalam platform yang disediakan.', {
    x: 50,
    y: yPosition - 35,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 70;

  // Issue Date
  const issueDate = new Date().toLocaleDateString();
  page.drawText(`Tarikh dikeluarkan: ${issueDate}`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 30;

  // Closing statement
  page.drawText('Sekian, terima kasih.', {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 30;

  // Signature
  page.drawText('Yang benar,', {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  page.drawText('PKS JKKP CAWANGAN WPKL', {
    x: 50,
    y: yPosition - 20,
    size: fontSize,
    font: timesRomanFont,
  });

  // Save the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Function to generate PDF receipt
async function generateReceipt(participantDetails: {
  receiptNo: string;
  invoiceNo: string;
  date: string;
  name: string;
  icNo: string;
  department: string;
  address: string;
  postcode: string;
  town: string;
  state: string;
  country: string;
  phoneNumber: string;
  email: string;
  amountPaid: string;
  category: string;
  bank: string;
}) {
  const { receiptNo, invoiceNo, date, name, icNo, department, address, postcode, town, state, country, phoneNumber, email, amountPaid, category, bank } = participantDetails;

  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the document
  const page = pdfDoc.addPage([600, 800]);
  const fontSize = 12;
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Load the header image
  const imagePath = path.resolve('./src/lib/images/jkkp-header.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const headerImage = await pdfDoc.embedPng(imageBuffer);
  const imageDims = headerImage.scale(1);

  // Draw the header image at the top of the page
  page.drawImage(headerImage, {
    x: 50,
    y: page.getHeight() - imageDims.height - 20,
    width: imageDims.width,
    height: imageDims.height,
  });

  // Set the position for the next text after the header
  let yPosition = page.getHeight() - imageDims.height - 50;

  // Title - RESIT
  page.drawText('RESIT', {
    x: 50,
    y: yPosition,
    size: 24,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  yPosition -= 40;

  // Payment Information
  page.drawText('Maklumat Pembayaran :', {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 20;

  const tableData = [
    { label: 'No. Resit:', value: `${receiptNo}` },
    { label: 'No. Invois/Tarikh:', value: `${invoiceNo} / ${date}` },
    { label: 'Nama:', value: name },
    { label: 'No. kad pengenalan:', value: icNo },
    { label: 'Nama dan Alamat Syarikat:', value: `${department}` },
    { label: '', value: `${address}`},
    { label: '', value: `${postcode}, ${town}, ${state}`},
    { label: '', value: `${country}`},
    { label: 'No. telefon:', value: phoneNumber },
    { label: 'Emel:', value: email },
    { label: 'Amaun Bayaran:', value: `RM ${amountPaid} (${category})` },
    { label: 'Bank:', value: bank },
  ];

  // Draw the table
  for (const { label, value } of tableData) {
    page.drawText(`${label}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
    });
    page.drawText(value, {
      x: 200, // Adjust position for values
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
    });
    yPosition -= 20;
  }

  // Footer information
  page.drawText('Tarikh dikeluarkan:', {
    x: 50,
    y: yPosition - 20,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 50;

  // Closing statement
  page.drawText('Sekian, terima kasih.', {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 30;

  // Signature
  page.drawText('Yang benar,', {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });
  page.drawText('PKS JKKP CAWANGAN WPKL', {
    x: 50,
    y: yPosition - 20,
    size: fontSize,
    font: timesRomanFont,
  });
  yPosition -= 50;

  // Footer note
  page.drawText(`'Ini Adalah Cetakan Komputer Dan Tidak Memerlukan Tandatangan'`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
  });

  // Save the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}


// Function to generate PDF invitation card
async function generateInvitationCard(participantDetails: {
  receiptNo: string;
  invoiceNo: string;
  date: string;
  name: string;
  icNo: string;
  department: string;
  address: string;
  postcode: string;
  town: string;
  state: string;
  country: string;
  phoneNumber: string;
  email: string;
  amountPaid: string;
  category: string;
  bank: string;
}) {
  const { receiptNo, invoiceNo, date, name, icNo, department, address, postcode, town, state, country, phoneNumber, email, amountPaid, category, bank } = participantDetails;
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the document
  const page = pdfDoc.addPage([600, 800]); // A4 dimensions

  // Load the header image
  const imagePath = path.resolve('./src/lib/images/jkkp-header.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const headerImage = await pdfDoc.embedPng(imageBuffer);
  const imageDims = headerImage.scale(1); // Adjust the scale as needed

  // Draw the header image at the top of the page
  page.drawImage(headerImage, {
    x: 50,
    y: page.getHeight() - imageDims.height - 50,
    width: imageDims.width,
    height: imageDims.height,
  });

  // Set font and position for text
  const fontSize = 12;
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  let yPosition = page.getHeight() - imageDims.height - 100;

  // Invitation text
  const invitationText = `
  Tuan, Puan, Encik, Cik:
  ${name},

  ${department},
  ${address},
  ${postcode},
  ${town},
  ${state},
  ${country}

Terimakasih kerana menyertai program ${category} bersempena dengan
SEMINAR & MAJLIS PERASMIAN GARIS PANDUAN PRISMA DI TEMPAT KERJA 2024

Jangan lupa temujanji kita pada 26-27 OKTOBER 2024
Sila gunakan QR Code yang disertakan untuk pengesahan kehadiran kursus fizikal di kaunter pendaftaran

Kerja Selamat, Minda Sejahtera

SEMINAR & MAJLIS PERASMIAN GARIS PANDUAN PRISMA DI TEMPAT KERJA 2024
`;

  page.drawText(invitationText, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
    lineHeight: 18,
  });

  yPosition -= 150;

  // Generate a QR code (100x100mm QR code)
  const crypto = require('crypto');
  const secretKey = process.env.SECRET_KEY;
  const qrCodeData = `${invoiceNo}${secretKey}`;
  const qrCodeHash = crypto.createHash('sha256').update(qrCodeData).digest('hex');
  
  const qrCodeUrl = await QRCode.toDataURL(qrCodeHash);
  const qrImage = await pdfDoc.embedPng(qrCodeUrl.split(',')[1]); // Removed 'base64' argument
  const qrDims = qrImage.scale(1); // Adjust the scale as needed

  // Draw the QR code image
  page.drawImage(qrImage, {
    x: ((page.getWidth() - qrDims.width) / 3) * 2, // Center the QR code horizontally
    y: yPosition,
    width: qrDims.width,
    height: qrDims.height,
  });

  // Save the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}



const smtp_options = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT), // Convert to number
    secure: process.env.SMTP_SECURE === "true", // Convert to boolean
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

const smtp_options_2 = {
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Ensure environment variables are defined
if (!smtp_options.host || !smtp_options.port || !smtp_options.auth.user || !smtp_options.auth.pass) {
  throw new Error('Missing required environment variables for SMTP configuration.');
}

export async function sendRegistrationEmail(email: string, participantId: number) {
  try {
    // Fetch participant data from Prisma
    const crypto = require('crypto');
    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      throw new Error(`Participant with ID ${participantId} not found`);
    }

    console.log('Participant found: ', participant);

    // Prepare data for the invoice
    const participantDetails = {
      id: participant.id,
      name: participant.name,
      ic: participant.ic,
      address: participant.address,
      postcode: participant.postcode, // Added postcode
      town: participant.town, // Added town
      state: participant.state, // Added state
      country: participant.country, // Added country
      telephoneNumber: participant.telephoneNumber,
      email: participant.email,
      ministry: participant.ministry,
      department: participant.department,
      category: participant.category,
      amountDue: (participantId <= 639 
        ? GetPrices["early_bird"][participant.category as keyof typeof GetPrices["early_bird"]].toString()
        : GetPrices["normal"][participant.category as keyof typeof GetPrices["normal"]].toString()),
    };

    // Generate the PDF invoice
    const invoicePdf = await generateInvoice(participantDetails);

    console.log(`PDF size: ${invoicePdf.length / 1024} KB`);

    // Initialize email transporter
    const transporter = nodemailer.createTransport(smtp_options);

    const hash = crypto.createHash('sha256').update(`${participant.id}${process.env.SECRET_KEY}`).digest('hex')

    // Send email with the PDF invoice attached
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: participant.email,
      subject: 'Invoice for Registration',
      text: 'Thank you for registering. Please find your invoice attached.',
      html: `
      <p>Thank you for registering. Please find your invoice attached.</p><img src="cid:flow.png" alt="Flow Chart">
      <p>Please proceed to make payment to the following account:</p>
      <p>Maybank 5644 2720 0291</p>
      <p>Please use the invoice number as the reference number.</p>
      <p>Please upload the payment proof to the following link: ${process.env.NEXT_PUBLIC_BASE_URL}/upload/${hash}</p>
      `,
      attachments: [
        {
          filename: `Invoice_${participant.id}.pdf`, // Name of the attached invoice
          content: Buffer.from(invoicePdf), // Convert Uint8Array to Buffer
          contentType: 'application/pdf', // Content type
        },
        {
          filename: 'flow.png',
          path: 'src/lib/images/flow.png',
          cid: 'flow.png'
        }
      ],
    });

    console.log(`Email sent to ${participant.email} with invoice attached.`);
  } catch (error: unknown) { // Specify the type of error
    if (error instanceof Error) { // Check if error is an instance of Error
      console.error(`Failed to send email: ${error.message}`);
      throw new Error('Failed to send the registration email');
    }
    console.error('Failed to send email: Unknown error'); // Handle unknown error
  }
}

export async function sendAcknowledgmentEmail(email: string) {
  const transporter = nodemailer.createTransport(smtp_options);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Payment Proof Received',
    text: 'Thank you for submitting your payment proof. We will review it shortly.',
  });
}

// Function to send approval email with attached PDF receipt
export const sendApprovalEmail = async (participantId: number, isLO: boolean = true) => {
  const transporter = nodemailer.createTransport(smtp_options);

  
  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
  });

  if (!participant) {
    throw new Error(`Participant with ID ${participantId} not found`);
  }

  const receipt = await prisma.receipt.findUnique({
    where: { invoice: `IKARKP24-${participant.id.toString().padStart(6, '0')}` },
  });

  if (!receipt) {
    throw new Error(`Participant with invoice number IKARKP24-${participant.id.toString().padStart(6, '0')} not found`);
  }

  const participantDetails: {
    receiptNo: string;
    invoiceNo: string;
    date: string;
    name: string;
    icNo: string;
    department: string;
    address: string;
    postcode: string;
    town: string;
    state: string;
    country: string;
    phoneNumber: string;
    email: string; // Added missing email property
    amountPaid: string;
    category: string;
    bank: string; // Changed type from any to string
  } = {
    receiptNo: `RKARKP24-${receipt.id.toString().padStart(6, '0')}`,
    invoiceNo: `IKARKP24-${participant.id.toString().padStart(6, '0')}`,
    date: new Date().toLocaleDateString(),
    name: participant.name,
    icNo: participant.ic,
    department: participant.department,
    address: participant.address,
    postcode: participant.postcode,
    town: participant.town,
    state: participant.state,
    country: participant.country,
    phoneNumber: participant.telephoneNumber,
    email: participant.email, // Added email assignment
    amountPaid: (participantId <= 639 
      ? GetPrices["early_bird"][participant.category as keyof typeof GetPrices["early_bird"]].toString()
      : GetPrices["normal"][participant.category as keyof typeof GetPrices["normal"]].toString()),
    category: participant.category,
    bank: receipt.bank,
  };

  // Generate the PDF receipt
  const pdfReceipt = await generateReceipt(participantDetails);

  // Generate the PDF invitation card
  const pdfInvitation = await generateInvitationCard(participantDetails);
  const attachment = isLO ? [ // if status Approved with LO then send receipt and invitation
    {
      filename: `Receipt_${participant.id}.pdf`, // Name of the PDF file
      content: Buffer.from(pdfReceipt), // PDF content in bytes
      contentType: 'application/pdf', // Set the content type
    },
    {
      filename: `Invitation_${participant.id}.pdf`, // Name of the PDF file
      content: Buffer.from(pdfInvitation), // PDF content in bytes
      contentType: 'application/pdf', // Set the content type
    },
    {
      filename: 'flow.png',
      path: 'src/lib/images/flow.png',
      cid: 'flow.png'
    }
  ] : [ // if status Approved with LO statement then send invitation only
    {
      filename: `Invitation_${participant.id}.pdf`, // Name of the PDF file
      content: Buffer.from(pdfInvitation), // PDF content in bytes
      contentType: 'application/pdf', // Set the content type
    },
    {
      filename: 'flow.png',
      path: 'src/lib/images/flow.png',
      cid: 'flow.png'
    }
  ];

  // Send the email with the attached PDF
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: participant.email,
    subject: 'Payment Proof Approved (Seminar Pengurusan Risiko)',
    text: `Dear ${participant.name},\n\nWe are pleased to inform you that your payment has been approved.\n\nThank you for your participation!\n\nBest regards,\nSeminar Team`,
    html: `<p>Dear ${participant.name},</p><p>We are pleased to inform you that your payment has been approved.</p><p>Thank you for your participation!</p><p>Best regards,<br/>Seminar Team</p><img src="cid:flow.png" alt="Flow Chart">`,
    attachments: attachment,
  });

  console.log(`Email sent to ${participant.email} with receipt attached.`);
};
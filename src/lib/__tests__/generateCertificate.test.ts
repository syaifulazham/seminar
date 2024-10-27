// src/lib/__tests__/generateCertificate.test.ts
import { PDFDocument } from 'pdf-lib';
import { generateCertificate } from '@/lib/email';

describe('generateCertificate', () => {
  it('should generate a certificate PDF for a participant', async () => {
    const participant = {
      name: 'John Doe',
      ic: '123456-78-9012',
      id: '001',
    };

    // Generate the certificate PDF
    const pdfBytes = await generateCertificate(participant);

    // Convert PDF bytes to string and inspect it
    const pdfContent = new TextDecoder().decode(pdfBytes);

    // Check if the participant's name, IC, and ID appear in the PDF content
    expect(pdfContent).toContain(participant.name);
    expect(pdfContent).toContain(participant.ic);
    expect(pdfContent).toContain(participant.id);

    // Further checks on layout or formatting can be added here if needed
  });
});

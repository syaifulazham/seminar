import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;
    
    const filePath = path.join(process.cwd(), 'uploads', filename);

    console.log("filePath: ",filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    // Serve the file
    const fileBuffer = fs.readFileSync(filePath);
    const fileType = path.extname(filename).substring(1); // e.g., pdf or jpg

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': `application/${fileType}`,
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('id') || `TL-Q-${Math.floor(100000 + Math.random() * 900000)}`;

    let quote: any = null;
    const docProject = searchParams.get('project') || 'Custom Product Engine';
    const docService = searchParams.get('service') || 'Fullstack Web Application';
    const docName = searchParams.get('name') || 'Valued Client';
    const docEmail = searchParams.get('email') || 'client@company.com';
    const docCompany = searchParams.get('company') || 'N/A';
    const docBudget = searchParams.get('budget') || '$10,000 - $25,000';
    const docMessage = `Direct PDF Download request for ${docProject} (${docService}).`;

    // Persist to MongoDB on download
    try {
      const db = await getDatabase();
      const quotesCollection = db.collection('quotes');
      quote = await quotesCollection.findOne({ quoteId });

      if (!quote) {
        const quoteDocument = {
          quoteId,
          name: docName,
          email: docEmail,
          company: docCompany,
          service: docService,
          budget: docBudget,
          projectName: docProject,
          message: docMessage,
          status: 'downloaded',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await quotesCollection.insertOne(quoteDocument);
        quote = quoteDocument;
      }
    } catch (dbErr) {
      console.warn('Database persistence warning during PDF download:', dbErr);
    }

    const createdAt = quote?.createdAt
      ? new Date(quote.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

    // Create jsPDF Document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Color Palette
    const gold = [201, 155, 62];
    const obsidian = [15, 17, 23];
    const darkGrey = [74, 77, 87];
    const lightBg = [252, 251, 249];

    // Page Background
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Top Header Banner Gradient Bar
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.rect(0, 0, 210, 8, 'F');

    // Header Branding
    doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('tensorLoom', 18, 26);

    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('AI ENGINEERING STUDIO', 18, 32);

    // Document Title
    doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL PROJECT QUOTE', 125, 26);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`REF: ${quoteId}`, 125, 32);

    // Divider Line
    doc.setDrawColor(201, 155, 62);
    doc.setLineWidth(0.5);
    doc.line(18, 38, 192, 38);

    // Client & Date Summary Box
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(18, 44, 174, 38, 3, 3, 'FD');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
    doc.text('PREPARED FOR:', 24, 52);
    doc.setFont('helvetica', 'normal');
    doc.text(`${docName} (${docCompany})`, 24, 58);
    doc.setFontSize(9);
    doc.setTextColor(darkGrey[0], darkGrey[1], darkGrey[2]);
    doc.text(`Email: ${docEmail}`, 24, 64);
    doc.text(`Date Issued: ${createdAt}`, 24, 70);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
    doc.text('PROJECT FOCUS:', 115, 52);
    doc.setFont('helvetica', 'normal');
    doc.text(docProject, 115, 58);
    doc.setFontSize(9);
    doc.setTextColor(darkGrey[0], darkGrey[1], darkGrey[2]);
    doc.text(`Service Category: ${docService}`, 115, 64);
    doc.text(`Target Budget: ${docBudget}`, 115, 70);

    // Section 2: Specification Summary Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
    doc.text('SCOPE & ARCHITECTURE SUMMARY', 18, 92);

    // Table Header
    doc.setFillColor(15, 17, 23);
    doc.rect(18, 98, 174, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Deliverable Component', 24, 103);
    doc.text('Engineering Standard', 120, 103);

    // Table Rows
    const rows = [
      ['System Architecture', 'Production Edge SSR / SPA Architecture'],
      ['Database & Persistence', 'MongoDB Atlas Distributed Database'],
      ['API & Performance', 'Sub-15ms Latency Endpoint Benchmarks'],
      ['Reliability SLA', '99.99% Enterprise Uptime SLA'],
      ['IP & Code Ownership', '100% Full Client Source Code Transfer'],
    ];

    let startY = 106;
    rows.forEach((row, i) => {
      startY += 10;
      doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 248);
      doc.rect(18, startY - 6, 174, 10, 'F');
      doc.setDrawColor(240, 240, 240);
      doc.line(18, startY + 4, 192, startY + 4);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
      doc.text(row[0], 24, startY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(darkGrey[0], darkGrey[1], darkGrey[2]);
      doc.text(row[1], 120, startY);
    });

    // Client Notes Box
    startY += 18;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
    doc.text('CLIENT SPECIFICATIONS & NOTES', 18, startY);

    startY += 6;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(18, startY, 174, 28, 3, 3, 'FD');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGrey[0], darkGrey[1], darkGrey[2]);
    const splitMessage = doc.splitTextToSize(docMessage, 164);
    doc.text(splitMessage, 24, startY + 8);

    // Terms & Sign Off
    startY += 38;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(obsidian[0], obsidian[1], obsidian[2]);
    doc.text('ESTIMATED TIMELINE & NEXT STEPS', 18, startY);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGrey[0], darkGrey[1], darkGrey[2]);
    doc.text(
      '1. Technical Discovery & Wireframe Alignment (Days 1–3)\n2. Core Engineering Sprint & Backend Database Provisions (Days 4–10)\n3. Production Deployment, Verification & SLA Sign-off (Days 11–14)',
      18,
      startY + 6,
    );

    // Verification Seal Footer
    doc.setFillColor(201, 155, 62);
    doc.rect(0, 282, 210, 15, 'F');

    doc.setTextColor(15, 17, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('tensorLoom AI Engineering Studio • hello@tensorloom.com • tensorloom.app', 18, 290);
    doc.text(`MongoDB Verified ID: ${quoteId}`, 145, 290);

    // Generate ArrayBuffer and Return PDF
    const pdfOutput = doc.output('arraybuffer');
    const safeProjectName = docProject.replace(/[^a-zA-Z0-9]/g, '_');

    return new NextResponse(pdfOutput, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="tensorLoom_quote_${safeProjectName}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating quote PDF:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to generate PDF document.', error: error.message },
      { status: 500 },
    );
  }
}

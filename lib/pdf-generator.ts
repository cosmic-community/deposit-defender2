import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { 
  Property, 
  Inspection, 
  Room, 
  ChecklistItem, 
  Photo, 
  SeverityLevel,
  PDFGenerationOptions 
} from '@/types';
import { getRoomTypeDisplayName } from './checklist-templates';

export interface InspectionReportData {
  inspection: Inspection;
  property: Property;
  rooms: (Room & {
    checklistItems: (ChecklistItem & {
      photos: Photo[];
    })[];
  })[];
}

const DEFAULT_PDF_OPTIONS: Required<PDFGenerationOptions> = {
  includePhotos: true,
  photoQuality: 'medium',
  includeWatermarks: true,
  pageOrientation: 'portrait'
};

/**
 * Generate PDF report for an inspection
 */
export async function generatePDFReport(
  data: InspectionReportData,
  options: PDFGenerationOptions = {}
): Promise<Blob> {
  const opts = { ...DEFAULT_PDF_OPTIONS, ...options };
  
  // Initialize PDF
  const pdf = new jsPDF({
    orientation: opts.pageOrientation,
    unit: 'mm',
    format: 'a4'
  });

  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;

  // Add header
  yPosition = addHeader(pdf, data, yPosition, margin);

  // Add property information
  yPosition = addPropertyInfo(pdf, data.property, yPosition, margin);

  // Add inspection summary
  yPosition = addInspectionSummary(pdf, data, yPosition, margin);

  // Add room details
  for (const room of data.rooms) {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }

    yPosition = await addRoomDetails(pdf, room, yPosition, margin, opts);
  }

  // Add footer to all pages
  addFooterToAllPages(pdf);

  // Convert to blob
  const pdfBlob = pdf.output('blob');
  return pdfBlob;
}

/**
 * Add header to PDF
 */
function addHeader(
  pdf: jsPDF,
  data: InspectionReportData,
  yPosition: number,
  margin: number
): number {
  const pageWidth = pdf.internal.pageSize.getWidth();

  // Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DepositDefender', margin, yPosition);

  // Subtitle
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Move-Out Inspection Report', margin, yPosition + 8);

  // Date and inspection info
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const dateText = `Generated: ${format(new Date(), 'PPP')}`;
  const inspectionText = `Inspection: ${data.inspection.title}`;
  
  pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), yPosition);
  pdf.text(inspectionText, pageWidth - margin - pdf.getTextWidth(inspectionText), yPosition + 5);

  // Add separator line
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPosition + 15, pageWidth - margin, yPosition + 15);

  return yPosition + 25;
}

/**
 * Add property information section
 */
function addPropertyInfo(
  pdf: jsPDF,
  property: Property,
  yPosition: number,
  margin: number
): number {
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Property Information', margin, yPosition);

  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const propertyInfo = [
    `Address: ${property.address}`,
    property.apartmentNumber ? `Unit: ${property.apartmentNumber}` : null,
    `Tenant: ${property.tenantName}`,
    `Tenant Contact: ${property.tenantContact}`,
    `Landlord: ${property.landlordName}`,
    `Landlord Contact: ${property.landlordContact}`,
    `Lease Start: ${format(new Date(property.leaseStartDate), 'PP')}`,
    `Lease End: ${format(new Date(property.leaseEndDate), 'PP')}`,
    `Move-Out Date: ${format(new Date(property.moveOutDate), 'PP')}`
  ].filter(Boolean) as string[];

  propertyInfo.forEach((info) => {
    pdf.text(info, margin, yPosition);
    yPosition += 5;
  });

  return yPosition + 10;
}

/**
 * Add inspection summary
 */
function addInspectionSummary(
  pdf: jsPDF,
  data: InspectionReportData,
  yPosition: number,
  margin: number
): number {
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Inspection Summary', margin, yPosition);

  yPosition += 8;

  // Calculate totals
  let totalItems = 0;
  let checkedItems = 0;
  let issuesFound = 0;
  const severityCounts = { minor: 0, moderate: 0, severe: 0 };

  data.rooms.forEach(room => {
    room.checklistItems.forEach(item => {
      totalItems++;
      if (item.isChecked) checkedItems++;
      if (item.severity) {
        issuesFound++;
        severityCounts[item.severity]++;
      }
    });
  });

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const summaryInfo = [
    `Total Rooms Inspected: ${data.rooms.length}`,
    `Total Checklist Items: ${totalItems}`,
    `Items Completed: ${checkedItems}`,
    `Issues Identified: ${issuesFound}`,
    `• Minor Issues: ${severityCounts.minor}`,
    `• Moderate Issues: ${severityCounts.moderate}`,
    `• Severe Issues: ${severityCounts.severe}`
  ];

  summaryInfo.forEach((info) => {
    pdf.text(info, margin, yPosition);
    yPosition += 5;
  });

  return yPosition + 10;
}

/**
 * Add room details
 */
async function addRoomDetails(
  pdf: jsPDF,
  room: Room & { checklistItems: (ChecklistItem & { photos: Photo[] })[] },
  yPosition: number,
  margin: number,
  options: Required<PDFGenerationOptions>
): Promise<number> {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Room header
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${getRoomTypeDisplayName(room.type)}: ${room.name}`, margin, yPosition);

  yPosition += 10;

  // Room status
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const statusText = room.isCompleted ? 'Completed' : 'In Progress';
  const completedDate = room.completedAt ? format(new Date(room.completedAt), 'PPp') : '';
  pdf.text(`Status: ${statusText} ${completedDate}`, margin, yPosition);

  yPosition += 8;

  // Room notes if any
  if (room.notes) {
    pdf.setFont('helvetica', 'italic');
    pdf.text(`Notes: ${room.notes}`, margin, yPosition);
    yPosition += 8;
  }

  // Checklist items
  for (const item of room.checklistItems) {
    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    yPosition = await addChecklistItem(pdf, item, yPosition, margin, options);
  }

  return yPosition + 5;
}

/**
 * Add individual checklist item
 */
async function addChecklistItem(
  pdf: jsPDF,
  item: ChecklistItem & { photos: Photo[] },
  yPosition: number,
  margin: number,
  options: Required<PDFGenerationOptions>
): Promise<number> {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Item header
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  
  // Checkbox
  const checkboxSize = 3;
  pdf.rect(margin, yPosition - 2, checkboxSize, checkboxSize);
  
  if (item.isChecked) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('✓', margin + 0.5, yPosition + 1);
  }

  // Item title
  pdf.text(item.item, margin + checkboxSize + 2, yPosition);

  // Severity indicator
  if (item.severity) {
    const severityColor = getSeverityColor(item.severity);
    pdf.setFillColor(severityColor.r, severityColor.g, severityColor.b);
    pdf.rect(pageWidth - margin - 15, yPosition - 3, 12, 4, 'F');
    
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text(item.severity.toUpperCase(), pageWidth - margin - 13, yPosition);
    pdf.setTextColor(0, 0, 0); // Reset to black
  }

  yPosition += 6;

  // Item description
  if (item.description) {
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    const splitDescription = pdf.splitTextToSize(item.description, pageWidth - margin * 2 - 20);
    pdf.text(splitDescription, margin + 10, yPosition);
    yPosition += splitDescription.length * 3;
  }

  // Item notes
  if (item.notes) {
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    const splitNotes = pdf.splitTextToSize(`Notes: ${item.notes}`, pageWidth - margin * 2 - 20);
    pdf.text(splitNotes, margin + 10, yPosition);
    yPosition += splitNotes.length * 3;
  }

  // Photos
  if (options.includePhotos && item.photos.length > 0) {
    yPosition += 3;
    
    for (const photo of item.photos) {
      // Check if we need a new page for photo
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      try {
        const imageData = options.includeWatermarks 
          ? photo.watermarkedUrl 
          : await blobToBase64(photo.blob);

        // Calculate photo dimensions (max 60mm width)
        const maxPhotoWidth = 60;
        const maxPhotoHeight = 40;
        const aspectRatio = photo.metadata.width / photo.metadata.height;
        
        let photoWidth = maxPhotoWidth;
        let photoHeight = maxPhotoWidth / aspectRatio;
        
        if (photoHeight > maxPhotoHeight) {
          photoHeight = maxPhotoHeight;
          photoWidth = maxPhotoHeight * aspectRatio;
        }

        // Add photo
        pdf.addImage(imageData, 'JPEG', margin + 10, yPosition, photoWidth, photoHeight);

        // Photo timestamp
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(
          format(new Date(photo.timestamp), 'PPp'),
          margin + 10,
          yPosition + photoHeight + 3
        );

        yPosition += photoHeight + 8;
      } catch (error) {
        console.error('Error adding photo to PDF:', error);
        // Add placeholder text if photo fails to load
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.text('[Photo could not be loaded]', margin + 10, yPosition);
        yPosition += 5;
      }
    }
  }

  return yPosition + 5;
}

/**
 * Add footer to all pages
 */
function addFooterToAllPages(pdf: jsPDF): void {
  const pageCount = pdf.internal.pages.length - 1; // Subtract 1 because first element is empty
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    
    // Footer line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);

    // Footer text
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(128, 128, 128);
    
    pdf.text('Generated by DepositDefender', 15, pageHeight - 10);
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 15 - pdf.getTextWidth(`Page ${i} of ${pageCount}`), pageHeight - 10);
    pdf.text(`Report Date: ${format(new Date(), 'PP')}`, pageWidth / 2 - pdf.getTextWidth(`Report Date: ${format(new Date(), 'PP')}`) / 2, pageHeight - 10);
  }

  // Reset text color
  pdf.setTextColor(0, 0, 0);
}

/**
 * Get color for severity level
 */
function getSeverityColor(severity: SeverityLevel): { r: number; g: number; b: number } {
  const colors = {
    minor: { r: 34, g: 197, b: 94 },   // green
    moderate: { r: 245, g: 158, b: 11 }, // yellow
    severe: { r: 239, g: 68, b: 68 }     // red
  };
  
  return colors[severity];
}

/**
 * Convert blob to base64
 */
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generate filename for PDF report
 */
export function generateReportFilename(property: Property, inspection: Inspection): string {
  const address = property.address.replace(/[^a-zA-Z0-9]/g, '_');
  const date = format(new Date(), 'yyyy-MM-dd');
  const apartmentSuffix = property.apartmentNumber ? `_Unit_${property.apartmentNumber}` : '';
  
  return `DepositDefender_Report_${address}${apartmentSuffix}_${date}.pdf`;
}
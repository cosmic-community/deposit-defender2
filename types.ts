// Base interfaces for the application
export interface Property {
  id: string;
  address: string;
  apartmentNumber?: string;
  landlordName: string;
  landlordContact: string;
  tenantName: string;
  tenantContact: string;
  leaseStartDate: Date;
  leaseEndDate: Date;
  moveOutDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inspection {
  id: string;
  propertyId: string;
  title: string;
  status: InspectionStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Room {
  id: string;
  inspectionId: string;
  type: RoomType;
  name: string;
  isCompleted: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  roomId: string;
  category: string;
  item: string;
  description: string;
  isChecked: boolean;
  severity?: SeverityLevel;
  notes?: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  checklistItemId: string;
  filename: string;
  blob: Blob;
  thumbnail: string; // base64 encoded thumbnail
  watermarkedUrl: string; // base64 encoded watermarked image
  timestamp: Date;
  metadata: PhotoMetadata;
}

export interface PhotoMetadata {
  width: number;
  height: number;
  size: number; // file size in bytes
  originalSize: number; // original file size before compression
  compressionRatio: number;
}

export interface PDFReport {
  id: string;
  inspectionId: string;
  filename: string;
  blob: Blob;
  generatedAt: Date;
  shareToken?: string;
}

// Enums and type literals
export type InspectionStatus = 'draft' | 'in-progress' | 'completed';

export type RoomType = 
  | 'kitchen'
  | 'bathroom'
  | 'bedroom'
  | 'living-room'
  | 'dining-room'
  | 'common-area'
  | 'outdoor';

export type SeverityLevel = 'minor' | 'moderate' | 'severe';

// Checklist templates for different room types
export interface ChecklistTemplate {
  roomType: RoomType;
  categories: ChecklistCategory[];
}

export interface ChecklistCategory {
  name: string;
  items: ChecklistItemTemplate[];
}

export interface ChecklistItemTemplate {
  item: string;
  description: string;
  isRequired: boolean;
}

// PDF generation types
export interface PDFGenerationOptions {
  includePhotos: boolean;
  photoQuality: 'low' | 'medium' | 'high';
  includeWatermarks: boolean;
  pageOrientation: 'portrait' | 'landscape';
}

// Sharing types
export interface ShareableLink {
  token: string;
  inspectionId: string;
  expiresAt: Date;
  accessCount: number;
  maxAccess: number;
}

// Database schema for Dexie
export interface DatabaseSchema {
  properties: Property;
  inspections: Inspection;
  rooms: Room;
  checklistItems: ChecklistItem;
  photos: Photo;
  reports: PDFReport;
  shareableLinks: ShareableLink;
}

// Form types
export interface PropertyFormData {
  address: string;
  apartmentNumber?: string;
  landlordName: string;
  landlordContact: string;
  tenantName: string;
  tenantContact: string;
  leaseStartDate: string;
  leaseEndDate: string;
  moveOutDate: string;
}

export interface RoomFormData {
  type: RoomType;
  name: string;
  notes?: string;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
}

// Utility types
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API response types for future enhancement
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Error handling
export interface AppError {
  code: string;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
}

// PWA types
export interface InstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Export collections for easier imports
export type {
  DatabaseSchema as DB,
  ChecklistItemTemplate as ChecklistTemplate,
  PhotoMetadata as ImageMetadata,
};
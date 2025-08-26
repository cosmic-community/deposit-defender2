import Dexie, { Table } from 'dexie';
import { 
  Property, 
  Inspection, 
  Room, 
  ChecklistItem, 
  Photo, 
  PDFReport, 
  ShareableLink 
} from '@/types';

export class DepositDefenderDB extends Dexie {
  properties!: Table<Property>;
  inspections!: Table<Inspection>;
  rooms!: Table<Room>;
  checklistItems!: Table<ChecklistItem>;
  photos!: Table<Photo>;
  reports!: Table<PDFReport>;
  shareableLinks!: Table<ShareableLink>;

  constructor() {
    super('DepositDefenderDB');
    
    this.version(1).stores({
      properties: '++id, address, tenantName, createdAt',
      inspections: '++id, propertyId, status, createdAt',
      rooms: '++id, inspectionId, type, isCompleted',
      checklistItems: '++id, roomId, category, isChecked, severity',
      photos: '++id, checklistItemId, filename, timestamp',
      reports: '++id, inspectionId, generatedAt',
      shareableLinks: '++token, inspectionId, expiresAt'
    });

    // Define hooks for automatic timestamp updates
    this.properties.hook('creating', function (primKey, obj, trans) {
      obj.createdAt = new Date();
      obj.updatedAt = new Date();
    });

    this.properties.hook('updating', function (modifications, primKey, obj, trans) {
      modifications.updatedAt = new Date();
    });

    this.inspections.hook('creating', function (primKey, obj, trans) {
      obj.createdAt = new Date();
      obj.updatedAt = new Date();
    });

    this.inspections.hook('updating', function (modifications, primKey, obj, trans) {
      modifications.updatedAt = new Date();
    });
  }

  // Helper method to clear all data (for testing/reset)
  async clearAllData(): Promise<void> {
    await Promise.all([
      this.properties.clear(),
      this.inspections.clear(),
      this.rooms.clear(),
      this.checklistItems.clear(),
      this.photos.clear(),
      this.reports.clear(),
      this.shareableLinks.clear()
    ]);
  }

  // Get inspection with all related data
  async getInspectionWithDetails(inspectionId: string) {
    const inspection = await this.inspections.get(inspectionId);
    if (!inspection) return null;

    const property = await this.properties.get(inspection.propertyId);
    const rooms = await this.rooms.where('inspectionId').equals(inspectionId).toArray();
    
    const roomsWithDetails = await Promise.all(
      rooms.map(async (room) => {
        const checklistItems = await this.checklistItems
          .where('roomId')
          .equals(room.id)
          .toArray();
        
        const itemsWithPhotos = await Promise.all(
          checklistItems.map(async (item) => {
            const photos = await this.photos
              .where('checklistItemId')
              .equals(item.id)
              .toArray();
            return { ...item, photos };
          })
        );
        
        return { ...room, checklistItems: itemsWithPhotos };
      })
    );

    return {
      inspection,
      property,
      rooms: roomsWithDetails
    };
  }

  // Calculate inspection progress
  async getInspectionProgress(inspectionId: string): Promise<{
    completedRooms: number;
    totalRooms: number;
    completedItems: number;
    totalItems: number;
    progressPercentage: number;
  }> {
    const rooms = await this.rooms.where('inspectionId').equals(inspectionId).toArray();
    const completedRooms = rooms.filter(room => room.isCompleted).length;

    let totalItems = 0;
    let completedItems = 0;

    for (const room of rooms) {
      const items = await this.checklistItems.where('roomId').equals(room.id).toArray();
      totalItems += items.length;
      completedItems += items.filter(item => item.isChecked).length;
    }

    const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    return {
      completedRooms,
      totalRooms: rooms.length,
      completedItems,
      totalItems,
      progressPercentage
    };
  }

  // Get storage usage statistics
  async getStorageStats() {
    const propertiesCount = await this.properties.count();
    const inspectionsCount = await this.inspections.count();
    const photosCount = await this.photos.count();
    const reportsCount = await this.reports.count();

    // Calculate approximate storage size
    const photos = await this.photos.toArray();
    const reports = await this.reports.toArray();

    const photosSize = photos.reduce((total, photo) => total + photo.blob.size, 0);
    const reportsSize = reports.reduce((total, report) => total + report.blob.size, 0);
    const totalSize = photosSize + reportsSize;

    return {
      properties: propertiesCount,
      inspections: inspectionsCount,
      photos: photosCount,
      reports: reportsCount,
      totalStorageBytes: totalSize,
      totalStorageMB: Math.round(totalSize / (1024 * 1024) * 100) / 100
    };
  }
}

// Create and export database instance
export const db = new DepositDefenderDB();

// Export database operations as separate functions for easier testing
export const dbOperations = {
  // Property operations
  createProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) =>
    db.properties.add({ ...property, id: crypto.randomUUID() } as Property),

  getProperty: (id: string) => db.properties.get(id),

  updateProperty: (id: string, changes: Partial<Property>) =>
    db.properties.update(id, changes),

  deleteProperty: (id: string) => db.properties.delete(id),

  getAllProperties: () => db.properties.orderBy('createdAt').reverse().toArray(),

  // Inspection operations
  createInspection: (inspection: Omit<Inspection, 'id' | 'createdAt' | 'updatedAt'>) =>
    db.inspections.add({ ...inspection, id: crypto.randomUUID() } as Inspection),

  getInspection: (id: string) => db.inspections.get(id),

  updateInspection: (id: string, changes: Partial<Inspection>) =>
    db.inspections.update(id, changes),

  deleteInspection: async (id: string) => {
    // Delete all related data
    const rooms = await db.rooms.where('inspectionId').equals(id).toArray();
    
    for (const room of rooms) {
      const items = await db.checklistItems.where('roomId').equals(room.id).toArray();
      
      for (const item of items) {
        await db.photos.where('checklistItemId').equals(item.id).delete();
      }
      
      await db.checklistItems.where('roomId').equals(room.id).delete();
    }
    
    await db.rooms.where('inspectionId').equals(id).delete();
    await db.reports.where('inspectionId').equals(id).delete();
    await db.shareableLinks.where('inspectionId').equals(id).delete();
    await db.inspections.delete(id);
  },

  getInspectionsByProperty: (propertyId: string) =>
    db.inspections.where('propertyId').equals(propertyId).toArray(),

  // Room operations
  createRoom: (room: Omit<Room, 'id'>) =>
    db.rooms.add({ ...room, id: crypto.randomUUID() } as Room),

  getRoom: (id: string) => db.rooms.get(id),

  updateRoom: (id: string, changes: Partial<Room>) =>
    db.rooms.update(id, changes),

  getRoomsByInspection: (inspectionId: string) =>
    db.rooms.where('inspectionId').equals(inspectionId).toArray(),

  // Checklist operations
  createChecklistItem: (item: Omit<ChecklistItem, 'id'>) =>
    db.checklistItems.add({ ...item, id: crypto.randomUUID() } as ChecklistItem),

  updateChecklistItem: (id: string, changes: Partial<ChecklistItem>) =>
    db.checklistItems.update(id, changes),

  getChecklistItemsByRoom: (roomId: string) =>
    db.checklistItems.where('roomId').equals(roomId).toArray(),

  // Photo operations
  createPhoto: (photo: Omit<Photo, 'id'>) =>
    db.photos.add({ ...photo, id: crypto.randomUUID() } as Photo),

  deletePhoto: (id: string) => db.photos.delete(id),

  getPhotosByItem: (checklistItemId: string) =>
    db.photos.where('checklistItemId').equals(checklistItemId).toArray(),

  // Report operations
  createReport: (report: Omit<PDFReport, 'id'>) =>
    db.reports.add({ ...report, id: crypto.randomUUID() } as PDFReport),

  getReportsByInspection: (inspectionId: string) =>
    db.reports.where('inspectionId').equals(inspectionId).toArray(),
};
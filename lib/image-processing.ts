export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  addWatermark?: boolean;
  watermarkText?: string;
}

export interface ProcessedImage {
  original: Blob;
  compressed: Blob;
  thumbnail: string; // base64
  watermarked: string; // base64
  metadata: {
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    width: number;
    height: number;
  };
}

// Default processing options
const DEFAULT_OPTIONS: Required<ImageProcessingOptions> = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.8,
  addWatermark: true,
  watermarkText: 'DepositDefender'
};

/**
 * Process an image file with compression, thumbnail generation, and watermarking
 */
export async function processImage(
  file: File,
  options: ImageProcessingOptions = {}
): Promise<ProcessedImage> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = async () => {
      try {
        // Calculate dimensions maintaining aspect ratio
        const { width, height } = calculateDimensions(
          img.width,
          img.height,
          opts.maxWidth,
          opts.maxHeight
        );

        // Create canvas for processing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        const compressedBlob = await canvasToBlob(canvas, 'image/jpeg', opts.quality);
        
        // Generate thumbnail (300x200 max)
        const thumbnailCanvas = document.createElement('canvas');
        const thumbnailCtx = thumbnailCanvas.getContext('2d');
        
        if (!thumbnailCtx) {
          reject(new Error('Could not get thumbnail canvas context'));
          return;
        }

        const thumbDimensions = calculateDimensions(width, height, 300, 200);
        thumbnailCanvas.width = thumbDimensions.width;
        thumbnailCanvas.height = thumbDimensions.height;
        
        thumbnailCtx.drawImage(img, 0, 0, thumbDimensions.width, thumbDimensions.height);
        const thumbnailBase64 = thumbnailCanvas.toDataURL('image/jpeg', 0.7);

        // Generate watermarked version
        let watermarkedBase64 = '';
        if (opts.addWatermark) {
          watermarkedBase64 = await addWatermark(canvas, opts.watermarkText);
        } else {
          watermarkedBase64 = canvas.toDataURL('image/jpeg', opts.quality);
        }

        resolve({
          original: file,
          compressed: compressedBlob,
          thumbnail: thumbnailBase64,
          watermarked: watermarkedBase64,
          metadata: {
            originalSize: file.size,
            compressedSize: compressedBlob.size,
            compressionRatio: Math.round((1 - compressedBlob.size / file.size) * 100),
            width,
            height
          }
        });

      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load the image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Calculate new dimensions maintaining aspect ratio
 */
function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  let width = originalWidth;
  let height = originalHeight;

  // Scale down if needed
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }

  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

/**
 * Convert canvas to blob
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string = 'image/jpeg',
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      type,
      quality
    );
  });
}

/**
 * Add watermark to canvas and return base64
 */
async function addWatermark(
  canvas: HTMLCanvasElement,
  watermarkText: string
): Promise<string> {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context for watermarking');
  }

  // Save current state
  ctx.save();

  // Configure watermark style
  const fontSize = Math.max(12, Math.min(canvas.width / 40, 24));
  ctx.font = `${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 1;

  // Add timestamp
  const now = new Date();
  const timestamp = `${watermarkText} • ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  // Position watermark at bottom right
  const textMetrics = ctx.measureText(timestamp);
  const padding = 10;
  const x = canvas.width - textMetrics.width - padding;
  const y = canvas.height - padding;

  // Add semi-transparent background
  const backgroundPadding = 4;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(
    x - backgroundPadding,
    y - fontSize - backgroundPadding,
    textMetrics.width + backgroundPadding * 2,
    fontSize + backgroundPadding * 2
  );

  // Add text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText(timestamp, x, y);
  ctx.strokeText(timestamp, x, y);

  // Restore state
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.8);
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please select a valid image file (JPEG, PNG, or WebP)'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image file size must be less than 10MB'
    };
  }

  return { isValid: true };
}

/**
 * Get file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Create a data URL from a blob
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
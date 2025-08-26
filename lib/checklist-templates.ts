import { ChecklistTemplate, RoomType } from '@/types';

export const checklistTemplates: Record<RoomType, ChecklistTemplate> = {
  kitchen: {
    roomType: 'kitchen',
    categories: [
      {
        name: 'Appliances',
        items: [
          { item: 'Refrigerator', description: 'Check interior, exterior, and functionality', isRequired: true },
          { item: 'Oven/Range', description: 'Check burners, oven interior, and exterior cleanliness', isRequired: true },
          { item: 'Dishwasher', description: 'Check interior, filters, and exterior condition', isRequired: true },
          { item: 'Microwave', description: 'Check interior and exterior cleanliness', isRequired: false },
          { item: 'Garbage Disposal', description: 'Test functionality and check for odors', isRequired: false },
          { item: 'Range Hood', description: 'Check filters, fan, and light functionality', isRequired: true },
        ]
      },
      {
        name: 'Cabinets & Storage',
        items: [
          { item: 'Cabinet Doors', description: 'Check alignment, hinges, and handles', isRequired: true },
          { item: 'Cabinet Interior', description: 'Check for stains, damage, or shelf issues', isRequired: true },
          { item: 'Drawers', description: 'Check slides, alignment, and interior condition', isRequired: true },
          { item: 'Pantry', description: 'Check shelving, door, and interior condition', isRequired: false },
        ]
      },
      {
        name: 'Countertops & Surfaces',
        items: [
          { item: 'Countertops', description: 'Check for scratches, stains, or damage', isRequired: true },
          { item: 'Backsplash', description: 'Check tiles, grout, and overall condition', isRequired: true },
          { item: 'Sink', description: 'Check for scratches, stains, and faucet operation', isRequired: true },
        ]
      },
      {
        name: 'Plumbing',
        items: [
          { item: 'Faucet', description: 'Check operation, leaks, and mineral buildup', isRequired: true },
          { item: 'Water Pressure', description: 'Test hot and cold water pressure', isRequired: true },
          { item: 'Under Sink Plumbing', description: 'Check for leaks or water damage', isRequired: true },
        ]
      },
      {
        name: 'Flooring & Walls',
        items: [
          { item: 'Flooring', description: 'Check for scratches, stains, or loose tiles', isRequired: true },
          { item: 'Walls', description: 'Check paint condition and any damage', isRequired: true },
          { item: 'Baseboards', description: 'Check condition and attachment', isRequired: true },
        ]
      }
    ]
  },

  bathroom: {
    roomType: 'bathroom',
    categories: [
      {
        name: 'Fixtures',
        items: [
          { item: 'Toilet', description: 'Check functionality, stability, and cleanliness', isRequired: true },
          { item: 'Bathtub/Shower', description: 'Check for cracks, stains, and functionality', isRequired: true },
          { item: 'Sink/Vanity', description: 'Check condition and water damage', isRequired: true },
          { item: 'Faucets', description: 'Check operation and any leaks', isRequired: true },
        ]
      },
      {
        name: 'Tile & Surfaces',
        items: [
          { item: 'Floor Tiles', description: 'Check for cracks, loose tiles, or damage', isRequired: true },
          { item: 'Wall Tiles', description: 'Check condition around wet areas', isRequired: true },
          { item: 'Grout', description: 'Check for missing, cracked, or discolored grout', isRequired: true },
          { item: 'Caulking', description: 'Check around tub, shower, and sink', isRequired: true },
        ]
      },
      {
        name: 'Ventilation & Lighting',
        items: [
          { item: 'Exhaust Fan', description: 'Test functionality and check for dust buildup', isRequired: true },
          { item: 'Light Fixtures', description: 'Check operation and condition', isRequired: true },
          { item: 'GFCI Outlets', description: 'Test reset functionality', isRequired: true },
        ]
      },
      {
        name: 'Storage & Accessories',
        items: [
          { item: 'Medicine Cabinet', description: 'Check door operation and interior condition', isRequired: false },
          { item: 'Towel Bars', description: 'Check mounting and stability', isRequired: false },
          { item: 'Mirror', description: 'Check for cracks or damage', isRequired: true },
        ]
      }
    ]
  },

  bedroom: {
    roomType: 'bedroom',
    categories: [
      {
        name: 'Walls & Ceiling',
        items: [
          { item: 'Paint Condition', description: 'Check for scuffs, holes, or damage', isRequired: true },
          { item: 'Nail Holes', description: 'Document any holes from pictures or mounting', isRequired: true },
          { item: 'Ceiling', description: 'Check for stains, cracks, or damage', isRequired: true },
          { item: 'Baseboards', description: 'Check condition and gaps', isRequired: true },
        ]
      },
      {
        name: 'Flooring',
        items: [
          { item: 'Carpet', description: 'Check for stains, wear, or damage', isRequired: true },
          { item: 'Hardwood/Laminate', description: 'Check for scratches or water damage', isRequired: true },
          { item: 'Transitions', description: 'Check strips between different flooring', isRequired: false },
        ]
      },
      {
        name: 'Closet',
        items: [
          { item: 'Closet Doors', description: 'Check operation and alignment', isRequired: true },
          { item: 'Closet Rod', description: 'Check mounting and stability', isRequired: true },
          { item: 'Shelving', description: 'Check condition and mounting', isRequired: false },
          { item: 'Closet Interior', description: 'Check walls and flooring inside closet', isRequired: true },
        ]
      },
      {
        name: 'Windows & Fixtures',
        items: [
          { item: 'Windows', description: 'Check operation, locks, and glass condition', isRequired: true },
          { item: 'Window Treatments', description: 'Check blinds, curtains, or shades if provided', isRequired: false },
          { item: 'Light Fixtures', description: 'Check operation and condition', isRequired: true },
          { item: 'Ceiling Fan', description: 'Check operation and stability', isRequired: false },
        ]
      },
      {
        name: 'Electrical',
        items: [
          { item: 'Outlets', description: 'Test functionality of all outlets', isRequired: true },
          { item: 'Light Switches', description: 'Test all switches and dimmers', isRequired: true },
        ]
      }
    ]
  },

  'living-room': {
    roomType: 'living-room',
    categories: [
      {
        name: 'Walls & Paint',
        items: [
          { item: 'Wall Paint', description: 'Check for scuffs, scratches, or fading', isRequired: true },
          { item: 'Nail Holes', description: 'Document holes from artwork or wall mounts', isRequired: true },
          { item: 'Accent Walls', description: 'Check condition of any special wall treatments', isRequired: false },
          { item: 'Crown Molding', description: 'Check for gaps or damage', isRequired: false },
        ]
      },
      {
        name: 'Flooring',
        items: [
          { item: 'Carpet', description: 'Check for stains, wear patterns, or damage', isRequired: true },
          { item: 'Hardwood', description: 'Check for scratches, dents, or water damage', isRequired: true },
          { item: 'Area Rugs', description: 'Check condition if provided by landlord', isRequired: false },
        ]
      },
      {
        name: 'Windows & Doors',
        items: [
          { item: 'Windows', description: 'Check operation, seals, and glass condition', isRequired: true },
          { item: 'Window Frames', description: 'Check for damage or paint issues', isRequired: true },
          { item: 'Interior Doors', description: 'Check operation and finish condition', isRequired: true },
          { item: 'Door Hardware', description: 'Check handles, locks, and hinges', isRequired: true },
        ]
      },
      {
        name: 'Lighting & Electrical',
        items: [
          { item: 'Ceiling Lights', description: 'Test all overhead lighting', isRequired: true },
          { item: 'Table/Floor Lamps', description: 'Check any provided lighting fixtures', isRequired: false },
          { item: 'Electrical Outlets', description: 'Test all outlets for functionality', isRequired: true },
          { item: 'Cable/Internet Outlets', description: 'Check condition of media connections', isRequired: false },
        ]
      },
      {
        name: 'Built-in Features',
        items: [
          { item: 'Fireplace', description: 'Check condition and safety features', isRequired: false },
          { item: 'Built-in Shelving', description: 'Check stability and condition', isRequired: false },
          { item: 'Entertainment Center', description: 'Check any built-in media storage', isRequired: false },
        ]
      }
    ]
  },

  'dining-room': {
    roomType: 'dining-room',
    categories: [
      {
        name: 'Walls & Surfaces',
        items: [
          { item: 'Wall Condition', description: 'Check paint and any damage', isRequired: true },
          { item: 'Wainscoting', description: 'Check condition if present', isRequired: false },
          { item: 'Chair Rail', description: 'Check mounting and condition', isRequired: false },
        ]
      },
      {
        name: 'Flooring',
        items: [
          { item: 'Flooring Condition', description: 'Check for damage under dining furniture area', isRequired: true },
          { item: 'Floor Protection', description: 'Check condition of any protective mats', isRequired: false },
        ]
      },
      {
        name: 'Lighting & Windows',
        items: [
          { item: 'Chandelier/Pendant', description: 'Check condition and operation', isRequired: false },
          { item: 'Natural Light', description: 'Check window condition and treatments', isRequired: true },
          { item: 'Light Switches', description: 'Test dimmer functionality if present', isRequired: true },
        ]
      }
    ]
  },

  'common-area': {
    roomType: 'common-area',
    categories: [
      {
        name: 'Entryway',
        items: [
          { item: 'Front Door', description: 'Check operation, locks, and weatherstripping', isRequired: true },
          { item: 'Entry Flooring', description: 'Check for wear or damage from foot traffic', isRequired: true },
          { item: 'Coat Closet', description: 'Check door operation and interior condition', isRequired: false },
        ]
      },
      {
        name: 'Hallways',
        items: [
          { item: 'Hallway Lighting', description: 'Test all hallway light fixtures', isRequired: true },
          { item: 'Hallway Flooring', description: 'Check carpet, hardwood, or tile condition', isRequired: true },
          { item: 'Wall Condition', description: 'Check for scuffs from foot traffic', isRequired: true },
        ]
      },
      {
        name: 'Stairways',
        items: [
          { item: 'Stair Treads', description: 'Check for wear, looseness, or damage', isRequired: false },
          { item: 'Handrails', description: 'Check stability and mounting', isRequired: false },
          { item: 'Stair Lighting', description: 'Ensure adequate lighting for safety', isRequired: false },
        ]
      },
      {
        name: 'Storage Areas',
        items: [
          { item: 'Linen Closet', description: 'Check shelving and door operation', isRequired: false },
          { item: 'Utility Closet', description: 'Check condition and organization', isRequired: false },
          { item: 'Basement/Attic Access', description: 'Check access points if applicable', isRequired: false },
        ]
      }
    ]
  },

  outdoor: {
    roomType: 'outdoor',
    categories: [
      {
        name: 'Balcony/Patio',
        items: [
          { item: 'Flooring/Decking', description: 'Check for damage, stains, or safety issues', isRequired: false },
          { item: 'Railings', description: 'Check stability and condition', isRequired: false },
          { item: 'Outdoor Furniture', description: 'Check condition if provided', isRequired: false },
        ]
      },
      {
        name: 'Yard/Garden',
        items: [
          { item: 'Landscaping', description: 'Document condition of plants and lawn', isRequired: false },
          { item: 'Fence/Boundary', description: 'Check condition of property boundaries', isRequired: false },
          { item: 'Outdoor Fixtures', description: 'Check lighting, outlets, or water spigots', isRequired: false },
        ]
      },
      {
        name: 'Parking',
        items: [
          { item: 'Garage', description: 'Check door operation and interior condition', isRequired: false },
          { item: 'Driveway', description: 'Check for cracks or damage', isRequired: false },
          { item: 'Parking Space', description: 'Document assigned parking area condition', isRequired: false },
        ]
      }
    ]
  }
};

// Helper function to get checklist template by room type
export function getChecklistTemplate(roomType: RoomType): ChecklistTemplate {
  return checklistTemplates[roomType];
}

// Helper function to get all room types
export function getAllRoomTypes(): RoomType[] {
  return Object.keys(checklistTemplates) as RoomType[];
}

// Helper function to get room type display name
export function getRoomTypeDisplayName(roomType: RoomType): string {
  const displayNames: Record<RoomType, string> = {
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    bedroom: 'Bedroom',
    'living-room': 'Living Room',
    'dining-room': 'Dining Room',
    'common-area': 'Common Areas',
    outdoor: 'Outdoor Spaces'
  };
  
  return displayNames[roomType];
}

// Helper function to count total checklist items for a room type
export function getTotalItemsForRoomType(roomType: RoomType): number {
  const template = getChecklistTemplate(roomType);
  return template.categories.reduce((total, category) => total + category.items.length, 0);
}

// Helper function to get required items count
export function getRequiredItemsCount(roomType: RoomType): number {
  const template = getChecklistTemplate(roomType);
  return template.categories.reduce((total, category) => 
    total + category.items.filter(item => item.isRequired).length, 0);
}
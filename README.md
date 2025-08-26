# DepositDefender 🛡️

![App Preview](https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=300&fit=crop&auto=format)

A comprehensive web application that guides renters through systematic move-out documentation to protect their security deposits. DepositDefender provides room-by-room checklists, professional evidence capture, and generates detailed PDF reports for landlord communication.

## ✨ Features

- **📋 Guided Inspections**: Room-specific checklists for thorough documentation
- **📱 Mobile-First Design**: Optimized for on-site property inspections
- **📸 Smart Photo Capture**: Automatic compression and watermarking
- **🏷️ Severity Tagging**: Categorize issues as minor, moderate, or severe
- **📄 PDF Report Generation**: Professional, shareable documentation
- **💾 Local-First Storage**: All data stored securely in your browser
- **🔄 Offline Capable**: Works without internet connection
- **📲 PWA Ready**: Install as a mobile app
- **🔒 Privacy Focused**: No data sent to external servers
- **🎨 Intuitive Interface**: Clean, professional design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ad001704ea77b1e31e571f&clone_repository=68ad031c04ea77b1e31e5727)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built as a standalone local-first application

### Code Generation Prompt

> Build a web app called DepositDefender that guides renters through room-by-room move-out evidence capture and generates professional PDF reports. Use Next.js with TypeScript, local-first storage via IndexedDB, client-side PDF generation, and PWA capabilities. Include guided checklists for different room types, image compression with watermarking, severity tagging, and optional secure sharing.

The app has been tailored to work with local browser storage and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS
- **Storage**: IndexedDB via Dexie.js
- **PDF Generation**: jsPDF with image support
- **Image Processing**: Canvas API for compression and watermarking
- **PWA**: Next-PWA for app-like experience
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Modern web browser with IndexedDB support
- Camera access for photo capture

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
bun run build
bun start
```

## 📱 PWA Installation

DepositDefender can be installed as a Progressive Web App:

1. Visit the app in your mobile browser
2. Look for the "Add to Home Screen" prompt
3. Tap "Install" to add the app to your device
4. Launch from your home screen for the full app experience

## 🏠 Room Types & Checklists

### Kitchen
- Appliance condition and cleanliness
- Cabinet and drawer functionality
- Countertop and backsplash condition
- Plumbing fixtures and faucets
- Flooring and walls

### Bathroom
- Fixtures and plumbing
- Tile and grout condition
- Ventilation and lighting
- Storage and mirrors
- Flooring condition

### Bedroom
- Wall and ceiling condition
- Flooring inspection
- Closet and storage
- Windows and fixtures
- Electrical outlets

### Living Areas
- Wall and paint condition
- Flooring assessment
- Windows and treatments
- Lighting fixtures
- Built-in features

### Common Areas
- Entryway condition
- Hallway assessment
- Stairway inspection
- Storage areas
- Outdoor spaces (if applicable)

## 📊 Severity Levels

- **🟢 Minor**: Small wear and tear, normal use damage
- **🟡 Moderate**: Noticeable issues requiring attention
- **🔴 Severe**: Significant damage requiring immediate repair

## 🔒 Privacy & Security

- All data stored locally in your browser
- No personal information sent to external servers
- Images processed entirely on your device
- Reports generated client-side
- Optional secure sharing via encrypted links

## 📄 PDF Reports

Generated reports include:
- Property and tenant information
- Room-by-room documentation
- High-resolution photos with timestamps
- Severity assessments and descriptions
- Professional formatting for landlord communication
- Automatic watermarking for authenticity

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically with zero configuration

### Netlify
1. Build the static export: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure redirects for SPA routing

### Self-Hosted
1. Build for production: `bun run build`
2. Serve the static files with any web server
3. Ensure HTTPS for PWA functionality

<!-- README_END -->
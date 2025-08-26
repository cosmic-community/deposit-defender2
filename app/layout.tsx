import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DepositDefender - Protect Your Security Deposit',
  description: 'Comprehensive move-out inspection app for renters. Document property condition, capture evidence, and generate professional reports to protect your security deposit.',
  keywords: 'rental inspection, security deposit, move-out checklist, property documentation, tenant rights',
  authors: [{ name: 'DepositDefender Team' }],
  creator: 'DepositDefender',
  publisher: 'DepositDefender',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DepositDefender',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#2563eb',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        {/* PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DepositDefender" />
        
        {/* iOS Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/icon-120x120.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} h-full bg-background text-foreground antialiased`}>
        <div id="root" className="min-h-full">
          {children}
        </div>
        
        {/* Service Worker registration will be handled by next-pwa */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Register service worker for PWA functionality
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Handle PWA install prompt
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                console.log('PWA install prompt available');
              });
              
              // Camera permissions helper
              async function requestCameraPermission() {
                try {
                  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                  stream.getTracks().forEach(track => track.stop());
                  return true;
                } catch (err) {
                  console.error('Camera permission denied:', err);
                  return false;
                }
              }
              
              // IndexedDB cleanup on startup
              window.addEventListener('load', function() {
                if ('indexedDB' in window) {
                  // Check available storage space
                  if ('storage' in navigator && 'estimate' in navigator.storage) {
                    navigator.storage.estimate().then(function(estimate) {
                      console.log('Storage estimate:', estimate);
                      if (estimate.quota && estimate.usage) {
                        const percentUsed = (estimate.usage / estimate.quota) * 100;
                        if (percentUsed > 80) {
                          console.warn('Storage usage high:', percentUsed.toFixed(2) + '%');
                        }
                      }
                    });
                  }
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
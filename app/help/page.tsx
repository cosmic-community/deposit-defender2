import Link from 'next/link'
import { 
  ArrowLeft, 
  Shield, 
  Camera, 
  FileText, 
  Smartphone, 
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react'
import Header from '@/components/Header'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
            <p className="text-muted-foreground">Everything you need to know about using DepositDefender</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Getting Started */}
            <section className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="card-title text-xl">Getting Started</h2>
                </div>
              </div>
              <div className="card-content space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                    <div>
                      <h3 className="font-semibold text-foreground">Add Your Property</h3>
                      <p className="text-muted-foreground text-sm">Enter your rental property details, including address, landlord information, and lease dates.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                    <div>
                      <h3 className="font-semibold text-foreground">Create an Inspection</h3>
                      <p className="text-muted-foreground text-sm">Select which rooms to inspect and give your inspection a descriptive name.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                    <div>
                      <h3 className="font-semibold text-foreground">Document Each Room</h3>
                      <p className="text-muted-foreground text-sm">Follow the guided checklists, take photos of any issues, and rate their severity.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                    <div>
                      <h3 className="font-semibold text-foreground">Generate Your Report</h3>
                      <p className="text-muted-foreground text-sm">Create a professional PDF report to share with your landlord.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Photography Tips */}
            <section className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <Camera className="h-6 w-6 text-success" />
                  <h2 className="card-title text-xl">Photography Best Practices</h2>
                </div>
              </div>
              <div className="card-content space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-success flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Do This
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Take photos in good lighting conditions</li>
                      <li>• Capture multiple angles of any damage</li>
                      <li>• Include context (wider shots showing location)</li>
                      <li>• Focus clearly on the issue</li>
                      <li>• Take photos of clean, undamaged areas too</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-warning flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Avoid This
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Blurry or dark photos</li>
                      <li>• Photos with personal items visible</li>
                      <li>• Extreme close-ups without context</li>
                      <li>• Photos taken too quickly</li>
                      <li>• Forgetting to document normal wear</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Pro Tip</h4>
                      <p className="text-sm text-blue-800">All photos are automatically watermarked with timestamp and app name for authenticity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Severity Levels */}
            <section className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  <h2 className="card-title text-xl">Understanding Severity Levels</h2>
                </div>
              </div>
              <div className="card-content space-y-4">
                <div className="space-y-4">
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <h3 className="font-semibold text-green-800 mb-2">🟢 Minor Issues</h3>
                    <p className="text-sm text-green-700 mb-2">Normal wear and tear expected from regular use</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Small nail holes from pictures</li>
                      <li>• Light scuff marks on walls</li>
                      <li>• Minor carpet wear in high-traffic areas</li>
                      <li>• Slight fading of paint or fixtures</li>
                    </ul>
                  </div>
                  
                  <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                    <h3 className="font-semibold text-yellow-800 mb-2">🟡 Moderate Issues</h3>
                    <p className="text-sm text-yellow-700 mb-2">Noticeable damage that may need repair</p>
                    <ul className="text-xs text-yellow-600 space-y-1">
                      <li>• Large holes in walls</li>
                      <li>• Stains on carpets or surfaces</li>
                      <li>• Damaged cabinet doors or drawers</li>
                      <li>• Broken fixtures that still function</li>
                    </ul>
                  </div>
                  
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h3 className="font-semibold text-red-800 mb-2">🔴 Severe Issues</h3>
                    <p className="text-sm text-red-700 mb-2">Significant damage requiring immediate attention</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Broken appliances or fixtures</li>
                      <li>• Water damage or mold</li>
                      <li>• Structural damage</li>
                      <li>• Safety hazards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* PWA Installation */}
            <section className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                  <h2 className="card-title text-xl">Installing as a Mobile App</h2>
                </div>
              </div>
              <div className="card-content space-y-4">
                <p className="text-muted-foreground">
                  DepositDefender can be installed as a mobile app for convenient on-site inspections.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">iOS (iPhone/iPad)</h3>
                    <ol className="text-sm text-muted-foreground space-y-1">
                      <li>1. Open in Safari browser</li>
                      <li>2. Tap the Share button</li>
                      <li>3. Select "Add to Home Screen"</li>
                      <li>4. Tap "Add" to confirm</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Android</h3>
                    <ol className="text-sm text-muted-foreground space-y-1">
                      <li>1. Open in Chrome browser</li>
                      <li>2. Tap the menu (three dots)</li>
                      <li>3. Select "Add to Home Screen"</li>
                      <li>4. Tap "Add" to confirm</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Tips */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Quick Tips</h3>
              </div>
              <div className="card-content space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Document everything, even if it looks normal</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Take photos before AND after cleaning</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Keep detailed notes about each issue</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Complete your inspection in one session</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Send the report to your landlord immediately</p>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Privacy & Security</h3>
              </div>
              <div className="card-content text-sm text-muted-foreground space-y-2">
                <p>✓ All data stored locally on your device</p>
                <p>✓ No personal information sent to external servers</p>
                <p>✓ Photos processed entirely client-side</p>
                <p>✓ Reports generated offline</p>
                <p>✓ You control all your data</p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Need Help?</h3>
              </div>
              <div className="card-content space-y-3">
                <p className="text-sm text-muted-foreground">
                  Having trouble? We're here to help!
                </p>
                
                <div className="space-y-2">
                  <a 
                    href="mailto:support@depositdefender.com" 
                    className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
                  >
                    <Mail className="h-4 w-4" />
                    <span>support@depositdefender.com</span>
                  </a>
                  
                  <a 
                    href="https://depositdefender.com/docs" 
                    className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Online Documentation</span>
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}
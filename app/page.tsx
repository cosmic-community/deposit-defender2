import Link from 'next/link'
import { Shield, Camera, FileText, Smartphone, CheckCircle, Users, Clock, Download } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">DepositDefender</span>
            </div>
            <Link 
              href="/dashboard" 
              className="btn-primary btn-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>Protect Your Security Deposit</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Professional Move-Out 
            <span className="text-primary"> Documentation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Systematically document your rental property condition with guided room-by-room checklists, 
            professional photo capture, and detailed PDF reports that landlords respect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary btn-lg">
              <Shield className="h-5 w-5 mr-2" />
              Start Inspection
            </Link>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary btn-lg"
            >
              Learn More
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Private & Secure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Room Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">📱</div>
              <div className="text-sm text-muted-foreground">Mobile First</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">PDF</div>
              <div className="text-sm text-muted-foreground">Pro Reports</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Protect Your Deposit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive documentation tools designed specifically for renters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="card-header">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="card-title text-lg">Guided Checklists</h3>
                <p className="card-description">
                  Room-specific inspection lists ensure you never miss important details
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="card-header">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-success" />
                </div>
                <h3 className="card-title text-lg">Smart Photo Capture</h3>
                <p className="card-description">
                  Automatic compression and watermarking with timestamp verification
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="card-header">
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-warning" />
                </div>
                <h3 className="card-title text-lg">Professional Reports</h3>
                <p className="card-description">
                  Generate comprehensive PDF reports that landlords take seriously
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card">
              <div className="card-header">
                <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-error" />
                </div>
                <h3 className="card-title text-lg">Issue Severity Tracking</h3>
                <p className="card-description">
                  Tag problems as minor, moderate, or severe with detailed descriptions
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="card">
              <div className="card-header">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="card-title text-lg">Mobile PWA</h3>
                <p className="card-description">
                  Install as a mobile app for convenient on-site property inspections
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="card">
              <div className="card-header">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="card-title text-lg">Offline Ready</h3>
                <p className="card-description">
                  Works without internet connection - all data stored locally and securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-muted-foreground">
              Document your move-out in minutes, not hours
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Create Your Property Profile</h3>
                <p className="text-muted-foreground">
                  Enter basic property and lease information to get started with your move-out documentation.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-success rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Complete Room Inspections</h3>
                <p className="text-muted-foreground">
                  Follow guided checklists for each room, take photos of any issues, and rate severity levels.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-success-100 rounded-lg flex items-center justify-center">
                  <Camera className="h-10 w-10 text-success" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-warning rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Generate & Share Report</h3>
                <p className="text-muted-foreground">
                  Create a professional PDF report and share it with your landlord to document property condition.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Download className="h-10 w-10 text-warning" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Deposit?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of renters who have successfully documented their move-outs 
            and recovered their full security deposits.
          </p>
          <Link href="/dashboard" className="inline-flex items-center btn bg-white text-primary hover:bg-gray-100 btn-lg">
            <Shield className="h-5 w-5 mr-2" />
            Start Your First Inspection
          </Link>
          
          <div className="mt-8 text-sm opacity-75">
            ✓ Completely free ✓ No signup required ✓ Data stays on your device
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6" />
              <span className="text-lg font-semibold">DepositDefender</span>
            </div>
            <div className="text-sm text-gray-400 text-center md:text-right">
              <div>© 2024 DepositDefender. Built for renters, by renters.</div>
              <div className="mt-1">Your data stays private and secure on your device.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, MapPin, User, Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import { PropertyFormData } from '@/types'
import { dbOperations } from '@/lib/database'
import Header from '@/components/Header'

export default function NewPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<PropertyFormData>({
    address: '',
    apartmentNumber: '',
    landlordName: '',
    landlordContact: '',
    tenantName: '',
    tenantContact: '',
    leaseStartDate: '',
    leaseEndDate: '',
    moveOutDate: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.address || !formData.landlordName || !formData.tenantName || !formData.moveOutDate) {
        alert('Please fill in all required fields')
        return
      }

      // Create property object
      const propertyData = {
        address: formData.address,
        apartmentNumber: formData.apartmentNumber || undefined,
        landlordName: formData.landlordName,
        landlordContact: formData.landlordContact,
        tenantName: formData.tenantName,
        tenantContact: formData.tenantContact,
        leaseStartDate: formData.leaseStartDate ? new Date(formData.leaseStartDate) : new Date(),
        leaseEndDate: formData.leaseEndDate ? new Date(formData.leaseEndDate) : new Date(),
        moveOutDate: new Date(formData.moveOutDate),
      }

      // Save to database
      const propertyId = await dbOperations.createProperty(propertyData)
      
      // Redirect to dashboard or property detail
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating property:', error)
      alert('Failed to create property. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof PropertyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Property</h1>
            <p className="text-muted-foreground">Enter property and lease details to get started</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Information */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="card-title">Property Information</h2>
              </div>
              <p className="card-description">Basic property details</p>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label htmlFor="address" className="label block mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className="input w-full"
                  placeholder="123 Main Street, City, State ZIP"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="apartmentNumber" className="label block mb-2">
                  Unit/Apartment Number (Optional)
                </label>
                <input
                  type="text"
                  id="apartmentNumber"
                  className="input w-full"
                  placeholder="Apt 2B, Unit 101, etc."
                  value={formData.apartmentNumber}
                  onChange={(e) => handleChange('apartmentNumber', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Tenant Information */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-success" />
                <h2 className="card-title">Tenant Information</h2>
              </div>
              <p className="card-description">Your contact details</p>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label htmlFor="tenantName" className="label block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="tenantName"
                  required
                  className="input w-full"
                  placeholder="Your full name"
                  value={formData.tenantName}
                  onChange={(e) => handleChange('tenantName', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="tenantContact" className="label block mb-2">
                  Contact Information
                </label>
                <input
                  type="text"
                  id="tenantContact"
                  className="input w-full"
                  placeholder="Phone number or email address"
                  value={formData.tenantContact}
                  onChange={(e) => handleChange('tenantContact', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Landlord Information */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-warning" />
                <h2 className="card-title">Landlord Information</h2>
              </div>
              <p className="card-description">Property owner or manager details</p>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label htmlFor="landlordName" className="label block mb-2">
                  Landlord Name *
                </label>
                <input
                  type="text"
                  id="landlordName"
                  required
                  className="input w-full"
                  placeholder="Property owner or management company"
                  value={formData.landlordName}
                  onChange={(e) => handleChange('landlordName', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="landlordContact" className="label block mb-2">
                  Landlord Contact
                </label>
                <input
                  type="text"
                  id="landlordContact"
                  className="input w-full"
                  placeholder="Phone number or email address"
                  value={formData.landlordContact}
                  onChange={(e) => handleChange('landlordContact', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Lease Information */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h2 className="card-title">Lease Information</h2>
              </div>
              <p className="card-description">Important lease dates</p>
            </div>
            <div className="card-content space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="leaseStartDate" className="label block mb-2">
                    Lease Start Date
                  </label>
                  <input
                    type="date"
                    id="leaseStartDate"
                    className="input w-full"
                    value={formData.leaseStartDate}
                    onChange={(e) => handleChange('leaseStartDate', e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="leaseEndDate" className="label block mb-2">
                    Lease End Date
                  </label>
                  <input
                    type="date"
                    id="leaseEndDate"
                    className="input w-full"
                    value={formData.leaseEndDate}
                    onChange={(e) => handleChange('leaseEndDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="moveOutDate" className="label block mb-2">
                  Move-Out Date *
                </label>
                <input
                  type="date"
                  id="moveOutDate"
                  required
                  className="input w-full"
                  value={formData.moveOutDate}
                  onChange={(e) => handleChange('moveOutDate', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This date will be used for inspection documentation
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <Link
              href="/dashboard"
              className="btn-secondary btn-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-md"
            >
              {loading ? (
                <>
                  <div className="loading-spinner w-4 h-4 mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Property
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
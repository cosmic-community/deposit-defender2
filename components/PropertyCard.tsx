'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { 
  MapPin, 
  Calendar, 
  MoreVertical, 
  Edit, 
  Trash2, 
  FileText, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Property, Inspection } from '@/types'
import { dbOperations } from '@/lib/database'

interface PropertyCardProps {
  property: Property
  onDeleted: () => void
  className?: string
}

export default function PropertyCard({ property, onDeleted, className = '' }: PropertyCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [loading, setLoading] = useState(false)
  const [inspectionsLoaded, setInspectionsLoaded] = useState(false)

  // Load inspections for this property when needed
  const loadInspections = async () => {
    if (inspectionsLoaded) return

    try {
      setLoading(true)
      const propertyInspections = await dbOperations.getInspectionsByProperty(property.id)
      setInspections(propertyInspections)
      setInspectionsLoaded(true)
    } catch (error) {
      console.error('Error loading inspections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property and all its inspections? This action cannot be undone.')) {
      return
    }

    try {
      setLoading(true)
      
      // Delete all inspections for this property
      const propertyInspections = await dbOperations.getInspectionsByProperty(property.id)
      
      for (const inspection of propertyInspections) {
        await dbOperations.deleteInspection(inspection.id)
      }
      
      // Delete the property
      await dbOperations.deleteProperty(property.id)
      
      onDeleted()
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Failed to delete property. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Calculate inspection stats
  const completedInspections = inspections.filter(i => i.status === 'completed').length
  const inProgressInspections = inspections.filter(i => i.status === 'in-progress').length
  const totalInspections = inspections.length

  return (
    <div className={`card hover:shadow-md transition-shadow ${className}`}>
      <div className="card-content p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <h3 className="text-lg font-semibold text-foreground truncate">
                {property.address}
              </h3>
              {property.apartmentNumber && (
                <span className="text-sm text-muted-foreground">
                  Unit {property.apartmentNumber}
                </span>
              )}
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Move-out: {format(new Date(property.moveOutDate), 'PPP')}</span>
              </div>
              <div>Tenant: {property.tenantName}</div>
              <div>Landlord: {property.landlordName}</div>
            </div>

            {/* Inspections Summary */}
            {inspectionsLoaded && (
              <div className="mt-4 flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>{completedInspections} completed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-yellow-600" />
                  <span>{inProgressInspections} in progress</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDropdown(!showDropdown)
                if (!inspectionsLoaded) loadInspections()
              }}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner w-4 h-4"></div>
              ) : (
                <MoreVertical className="h-4 w-4" />
              )}
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-border z-20">
                  <div className="py-1">
                    <Link
                      href={`/properties/${property.id}/edit`}
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Property
                    </Link>
                    
                    <Link
                      href={`/inspections/new?propertyId=${property.id}`}
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Inspection
                    </Link>

                    {totalInspections > 0 && (
                      <Link
                        href={`/properties/${property.id}/inspections`}
                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Inspections ({totalInspections})
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        setShowDropdown(false)
                        handleDelete()
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Property
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Link
              href={`/inspections/new?propertyId=${property.id}`}
              className="btn-primary btn-sm"
            >
              <Plus className="h-3 w-3 mr-1" />
              New Inspection
            </Link>
            
            {totalInspections > 0 && (
              <Link
                href={`/properties/${property.id}/inspections`}
                className="btn-secondary btn-sm"
              >
                <FileText className="h-3 w-3 mr-1" />
                View All ({totalInspections})
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
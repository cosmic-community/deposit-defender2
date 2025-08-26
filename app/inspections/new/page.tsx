'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Save, FileText, Home as HomeIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import { Property, RoomType } from '@/types'
import { dbOperations } from '@/lib/database'
import { getAllRoomTypes, getRoomTypeDisplayName } from '@/lib/checklist-templates'
import Header from '@/components/Header'

export default function NewInspectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('propertyId')
  
  const [loading, setLoading] = useState(false)
  const [property, setProperty] = useState<Property | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(propertyId || '')
  const [inspectionTitle, setInspectionTitle] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<{ type: RoomType; name: string }[]>([])

  // Load properties on mount
  useEffect(() => {
    loadProperties()
  }, [])

  // Load specific property if propertyId is provided
  useEffect(() => {
    if (selectedPropertyId) {
      loadProperty(selectedPropertyId)
      
      // Set default inspection title based on current date
      const today = new Date().toLocaleDateString()
      setInspectionTitle(`Move-out Inspection - ${today}`)
    }
  }, [selectedPropertyId])

  const loadProperties = async () => {
    try {
      const allProperties = await dbOperations.getAllProperties()
      setProperties(allProperties)
      
      if (allProperties.length === 1 && !selectedPropertyId) {
        setSelectedPropertyId(allProperties[0].id)
      }
    } catch (error) {
      console.error('Error loading properties:', error)
    }
  }

  const loadProperty = async (id: string) => {
    try {
      const propertyData = await dbOperations.getProperty(id)
      setProperty(propertyData || null)
    } catch (error) {
      console.error('Error loading property:', error)
    }
  }

  const handleRoomToggle = (roomType: RoomType) => {
    setSelectedRooms(prev => {
      const existing = prev.find(room => room.type === roomType)
      if (existing) {
        return prev.filter(room => room.type !== roomType)
      } else {
        return [...prev, { 
          type: roomType, 
          name: getRoomTypeDisplayName(roomType) 
        }]
      }
    })
  }

  const handleRoomNameChange = (roomType: RoomType, name: string) => {
    setSelectedRooms(prev =>
      prev.map(room =>
        room.type === roomType ? { ...room, name } : room
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPropertyId || !inspectionTitle || selectedRooms.length === 0) {
      alert('Please fill in all required fields and select at least one room')
      return
    }

    setLoading(true)

    try {
      // Create the inspection
      const inspectionId = await dbOperations.createInspection({
        propertyId: selectedPropertyId,
        title: inspectionTitle,
        status: 'draft'
      })

      // Create rooms for the inspection
      for (const room of selectedRooms) {
        await dbOperations.createRoom({
          inspectionId,
          type: room.type,
          name: room.name,
          isCompleted: false
        })
      }

      // Redirect to the inspection detail page
      router.push(`/inspections/${inspectionId}`)
    } catch (error) {
      console.error('Error creating inspection:', error)
      alert('Failed to create inspection. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center py-12">
            <HomeIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Properties Found</h2>
            <p className="text-muted-foreground mb-6">
              You need to add a property before creating an inspection.
            </p>
            <Link href="/properties/new" className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </div>
        </main>
      </div>
    )
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
            <h1 className="text-2xl font-bold text-foreground">New Inspection</h1>
            <p className="text-muted-foreground">Create a move-out inspection for your property</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Selection */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <HomeIcon className="h-5 w-5 text-primary" />
                <h2 className="card-title">Select Property</h2>
              </div>
              <p className="card-description">Choose the property to inspect</p>
            </div>
            <div className="card-content">
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="input w-full"
                required
              >
                <option value="">Select a property...</option>
                {properties.map((prop) => (
                  <option key={prop.id} value={prop.id}>
                    {prop.address} {prop.apartmentNumber && `(Unit ${prop.apartmentNumber})`}
                  </option>
                ))}
              </select>
              
              {property && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Property Details</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Address: {property.address}</div>
                    {property.apartmentNumber && <div>Unit: {property.apartmentNumber}</div>}
                    <div>Landlord: {property.landlordName}</div>
                    <div>Move-out: {new Date(property.moveOutDate).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inspection Details */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-success" />
                <h2 className="card-title">Inspection Details</h2>
              </div>
              <p className="card-description">Basic information about this inspection</p>
            </div>
            <div className="card-content">
              <div>
                <label htmlFor="title" className="label block mb-2">
                  Inspection Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="input w-full"
                  placeholder="e.g., Move-out Inspection - December 2024"
                  value={inspectionTitle}
                  onChange={(e) => setInspectionTitle(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Select Rooms to Inspect</h2>
              <p className="card-description">Choose which rooms to include in this inspection</p>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 gap-4">
                {getAllRoomTypes().map((roomType) => {
                  const isSelected = selectedRooms.some(room => room.type === roomType)
                  const selectedRoom = selectedRooms.find(room => room.type === roomType)
                  
                  return (
                    <div key={roomType} className="border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          id={roomType}
                          checked={isSelected}
                          onChange={() => handleRoomToggle(roomType)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <label 
                          htmlFor={roomType}
                          className="font-medium text-foreground cursor-pointer"
                        >
                          {getRoomTypeDisplayName(roomType)}
                        </label>
                      </div>
                      
                      {isSelected && (
                        <div>
                          <label className="label block mb-2 text-sm">
                            Room Name (Optional)
                          </label>
                          <input
                            type="text"
                            className="input w-full"
                            placeholder={`e.g., Master ${getRoomTypeDisplayName(roomType)}, Guest ${getRoomTypeDisplayName(roomType)}`}
                            value={selectedRoom ? selectedRoom.name : ''}
                            onChange={(e) => handleRoomNameChange(roomType, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {selectedRooms.length === 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  Select at least one room to include in your inspection.
                </p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <Link href="/dashboard" className="btn-secondary btn-md">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !selectedPropertyId || selectedRooms.length === 0}
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
                  Create Inspection
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
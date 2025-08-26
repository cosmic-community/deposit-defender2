'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Home, FileText, Clock, CheckCircle, AlertCircle, Shield, ArrowRight } from 'lucide-react'
import { Property, Inspection } from '@/types'
import { dbOperations, db } from '@/lib/database'
import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import PropertyCard from '@/components/PropertyCard'
import RecentActivity from '@/components/RecentActivity'

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalInspections: 0,
    completedInspections: 0,
    inProgressInspections: 0
  })

  // Load data from IndexedDB
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      const [propertiesData, storageStats] = await Promise.all([
        dbOperations.getAllProperties(),
        db.getStorageStats()
      ])
      
      setProperties(propertiesData)
      
      // Load inspections for all properties
      const allInspections: Inspection[] = []
      for (const property of propertiesData) {
        const propertyInspections = await dbOperations.getInspectionsByProperty(property.id)
        allInspections.push(...propertyInspections)
      }
      
      setInspections(allInspections)
      
      // Calculate stats
      setStats({
        totalProperties: propertiesData.length,
        totalInspections: allInspections.length,
        completedInspections: allInspections.filter(i => i.status === 'completed').length,
        inProgressInspections: allInspections.filter(i => i.status === 'in-progress').length
      })
      
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePropertyDeleted = () => {
    // Reload data after property deletion
    loadDashboardData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="loading-spinner w-8 h-8 mx-auto mb-4 text-primary"></div>
              <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your property inspections and protect your security deposits
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={Home}
            title="Properties"
            value={stats.totalProperties}
            description="Total properties"
            color="blue"
          />
          <StatsCard
            icon={FileText}
            title="Inspections"
            value={stats.totalInspections}
            description="All inspections"
            color="green"
          />
          <StatsCard
            icon={Clock}
            title="In Progress"
            value={stats.inProgressInspections}
            description="Active inspections"
            color="yellow"
          />
          <StatsCard
            icon={CheckCircle}
            title="Completed"
            value={stats.completedInspections}
            description="Finished inspections"
            color="purple"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Properties Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Properties</h2>
              <Link href="/properties/new" className="btn-primary btn-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Link>
            </div>

            {properties.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Properties Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Get started by adding your first property to begin creating move-out documentation.
                </p>
                <Link href="/properties/new" className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onDeleted={handlePropertyDeleted}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <RecentActivity inspections={inspections.slice(0, 5)} />

            {/* Quick Actions */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title text-lg">Quick Actions</h3>
                <p className="card-description">Common tasks and shortcuts</p>
              </div>
              <div className="card-content space-y-3">
                <Link
                  href="/properties/new"
                  className="flex items-center justify-between p-3 rounded-md border hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Home className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">New Property</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                
                <Link
                  href="/help"
                  className="flex items-center justify-between p-3 rounded-md border hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-success" />
                    </div>
                    <span className="font-medium">Help & Tips</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* Storage Usage */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title text-lg">Storage Usage</h3>
                <p className="card-description">Local data usage</p>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Photos</span>
                    <span className="font-medium">{stats.totalInspections} items</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reports</span>
                    <span className="font-medium">{stats.completedInspections} files</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    All data is stored securely on your device
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
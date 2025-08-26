import Link from 'next/link'
import { format, formatDistanceToNow } from 'date-fns'
import { FileText, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react'
import { Inspection } from '@/types'

interface RecentActivityProps {
  inspections: Inspection[]
  className?: string
}

export default function RecentActivity({ inspections, className = '' }: RecentActivityProps) {
  const getStatusIcon = (status: Inspection['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'in-progress':
        return Clock
      default:
        return FileText
    }
  }

  const getStatusColor = (status: Inspection['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (inspections.length === 0) {
    return (
      <div className={`card ${className}`}>
        <div className="card-header">
          <h3 className="card-title text-lg">Recent Activity</h3>
          <p className="card-description">Your latest inspections</p>
        </div>
        <div className="card-content">
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h3 className="card-title text-lg">Recent Activity</h3>
        <p className="card-description">Your latest inspections</p>
      </div>
      <div className="card-content">
        <div className="space-y-3">
          {inspections.map((inspection) => {
            const StatusIcon = getStatusIcon(inspection.status)
            const statusColor = getStatusColor(inspection.status)
            
            return (
              <div
                key={inspection.id}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColor}`}>
                  <StatusIcon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {inspection.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {formatDistanceToNow(new Date(inspection.updatedAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {inspections.length >= 5 && (
          <div className="mt-4 pt-3 border-t border-border">
            <Link
              href="/inspections"
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              View all inspections →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}